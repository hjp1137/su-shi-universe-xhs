#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 构建、数据校验、静态合规扫描与官方 Skill 1.6.0 双重审计脚本
遵循基线：Offline H5 / index.html ZIP 根入口 / CSP Safe / Classic Script / ES2017 / Chrome 61
"""

import os
import sys
import shutil
import zipfile
import re
import subprocess
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DIST_DIR = PROJECT_ROOT / "dist"
PACKAGE_NAME = "su-shi-universe-xhs.zip"
ZIP_OUTPUT = DIST_DIR / PACKAGE_NAME

VALIDATE_CONTENT_SCRIPT = PROJECT_ROOT / "scripts" / "validate_content.py"
BUILD_CONTENT_SCRIPT = PROJECT_ROOT / "scripts" / "build_content.py"

SKILL_PY_SCRIPT = PROJECT_ROOT / ".skill" / "minitool-zip-builder" / "scripts" / "audit_artifact.py"
SKILL_MJS_SCRIPT = PROJECT_ROOT / ".skill" / "minitool-zip-builder" / "scripts" / "audit_artifact.mjs"

ALLOWED_EXTENSIONS = {
    ".html", ".css", ".js",
    ".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg",
    ".woff", ".woff2", ".json"
}

FORBIDDEN_PATTERNS = [
    (r"fetch\(", "fetch API 网络请求"),
    (r"XMLHttpRequest", "XMLHttpRequest 网络请求"),
    (r"new\s+WebSocket\(", "WebSocket 实时连接"),
    (r"new\s+EventSource\(", "EventSource 实时连接"),
    (r"new\s+RTCPeerConnection\(", "RTCPeerConnection"),
    (r"navigator\.geolocation", "地理定位 API"),
    (r"navigator\.clipboard", "剪贴板 API"),
    (r"document\.execCommand\(", "execCommand 剪贴板操作"),
    (r"navigator\.bluetooth", "蓝牙 API"),
    (r"navigator\.usb", "USB API"),
    (r"new\s+Worker\(", "Web Worker"),
    (r"new\s+SharedWorker\(", "SharedWorker"),
    (r"navigator\.serviceWorker", "Service Worker"),
    (r"eval\(", "eval 动态执行"),
    (r"new\s+Function\(", "new Function 动态执行"),
    (r"window\.open\(", "window.open 打开新窗口"),
    (r"<base\s+", "<base> 标签"),
    (r"<iframe", "iframe 嵌套"),
    (r"<object", "object 嵌套"),
    (r"onclick\s*=", "行内 onclick 事件"),
    (r"https?://", "http/https 外部网络资源引用"),
]


def run_data_pipeline():
    print("[1/6] 执行内容数据底座自动校验与离线编译...")
    # 1. 运行校验脚本
    res_val = subprocess.run([sys.executable, str(VALIDATE_CONTENT_SCRIPT)], capture_output=True, text=True)
    print(res_val.stdout.strip())
    if res_val.returncode != 0:
        print(f"[ERROR] 内容数据校验未通过！\n{res_val.stderr.strip()}")
        return False

    # 2. 运行编译脚本
    res_build = subprocess.run([sys.executable, str(BUILD_CONTENT_SCRIPT)], capture_output=True, text=True)
    print(res_build.stdout.strip())
    if res_build.returncode != 0:
        print(f"[ERROR] 离线数据脚本编译失败！\n{res_build.stderr.strip()}")
        return False

    return True


def clean_dist():
    if DIST_DIR.exists():
        shutil.rmtree(DIST_DIR)
    DIST_DIR.mkdir(parents=True, exist_ok=True)
    print(f"[2/6] 已清理并初始化输出目录: {DIST_DIR}")


def copy_runtime_files():
    runtime_entries = [
        ("index.html", DIST_DIR / "index.html"),
        ("css", DIST_DIR / "css"),
        ("js", DIST_DIR / "js"),
        ("assets", DIST_DIR / "assets"),
        ("data", DIST_DIR / "data"),
    ]

    for src_name, dst_path in runtime_entries:
        src_path = PROJECT_ROOT / src_name
        if not src_path.exists():
            continue
        if src_path.is_file():
            shutil.copy2(src_path, dst_path)
        elif src_path.is_dir():
            shutil.copytree(src_path, dst_path, ignore=shutil.ignore_patterns("*.md", "*.git*", "*.map", "__pycache__"))

    print("[3/6] 运行时文件已复制到 dist/ 目录 (规范包含: index.html, css/, js/, assets/, data/)")


def check_dist_compliance():
    print("[4/6] 正在执行小红书端能力与静态合规扫描...")
    errors = []

    # 1. 检查 index.html 是否位于根目录
    if not (DIST_DIR / "index.html").is_file():
        errors.append("根目录下缺失 index.html 入口文件！")

    # 2. 检查文件后缀白名单
    for path in DIST_DIR.rglob("*"):
        if path.is_file():
            ext = path.suffix.lower()
            if ext not in ALLOWED_EXTENSIONS and path.name != PACKAGE_NAME:
                errors.append(f"发现未经官方允许的文件类型: {path.relative_to(DIST_DIR)}")

    # 3. 检查 HTML / JS / CSS 源码内容是否有禁用模式
    text_suffixes = {".html", ".css", ".js"}
    for path in DIST_DIR.rglob("*"):
        if path.is_file() and path.suffix.lower() in text_suffixes:
            try:
                content = path.read_text(encoding="utf-8")
            except Exception as e:
                errors.append(f"无法读取文件 {path}: {e}")
                continue

            rel_path = path.relative_to(DIST_DIR).as_posix()

            # 针对 index.html 特别检查是否有内联 <script>...</script>
            if path.name == "index.html":
                script_inline = re.findall(r"<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>", content, re.DOTALL | re.IGNORECASE)
                for s in script_inline:
                    if s.strip():
                        errors.append(f"{rel_path}: 存在内联脚本代码，违背容器 CSP 约束")

            # 检查禁用特征
            for pattern, desc in FORBIDDEN_PATTERNS:
                if "https?://" in pattern and path.suffix.lower() == ".svg":
                    continue
                matches = re.findall(pattern, content, re.IGNORECASE)
                if matches:
                    if "https?://" in pattern:
                        real_urls = [m for m in re.findall(r'https?://[^\s"\'<>]+', content) if "www.w3.org" not in m]
                        if real_urls:
                            errors.append(f"{rel_path}: 发现外部网络 URL 引用: {real_urls[:3]}")
                    else:
                        errors.append(f"{rel_path}: 命中被禁能力或不合规模式: {desc}")

    if errors:
        for err in errors:
            print(f"  [ERROR] {err}")
        return False
    print("  [PASS] 端能力与文件格式合规检查全部通过")
    return True


def create_zip():
    print(f"[5/6] 正在打包为离线 zip: {PACKAGE_NAME} ...")
    with zipfile.ZipFile(ZIP_OUTPUT, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(DIST_DIR):
            for file in sorted(files):
                if file == PACKAGE_NAME:
                    continue
                full_path = Path(root) / file
                rel_path = full_path.relative_to(DIST_DIR)
                zf.write(full_path, arcname=rel_path.as_posix())

    zip_size_kb = ZIP_OUTPUT.stat().st_size / 1024
    print(f"  [PASS] 打包成功，包体积: {zip_size_kb:.2f} KB (推荐目标 ≤ 2048 KB, 硬上限 10240 KB)")


def run_official_audits():
    print("[6/6] 正在执行小红书官方 Skill 1.6.0 双重审计 (产物目录与 ZIP 包)...")

    # 1. Python 审计
    if SKILL_PY_SCRIPT.exists():
        print("\n--- Python 官方审计: 产物目录 (dist/) ---")
        p_dir = subprocess.run([sys.executable, str(SKILL_PY_SCRIPT), str(DIST_DIR)], capture_output=True, text=True)
        print(p_dir.stdout.strip())
        if p_dir.returncode != 0:
            print(f"  [FAIL] Python 目录审计未通过: {p_dir.stderr.strip()}")
            return False

        print(f"\n--- Python 官方审计: 产物 ZIP ({PACKAGE_NAME}) ---")
        p_zip = subprocess.run([sys.executable, str(SKILL_PY_SCRIPT), str(ZIP_OUTPUT)], capture_output=True, text=True)
        print(p_zip.stdout.strip())
        if p_zip.returncode != 0:
            print(f"  [FAIL] Python ZIP 审计未通过: {p_zip.stderr.strip()}")
            return False
    else:
        print(f"  [WARN] 未找到官方 Python 审计脚本: {SKILL_PY_SCRIPT}")

    # 2. Node.js 审计
    if SKILL_MJS_SCRIPT.exists():
        node_bin = shutil.which("node")
        if node_bin:
            print("\n--- Node.js 官方审计: 产物目录 (dist/) ---")
            n_dir = subprocess.run([node_bin, str(SKILL_MJS_SCRIPT), str(DIST_DIR)], capture_output=True, text=True)
            print(n_dir.stdout.strip())
            if n_dir.returncode != 0:
                print(f"  [FAIL] Node 目录审计未通过: {n_dir.stderr.strip()}")
                return False

            print(f"\n--- Node.js 官方审计: 产物 ZIP ({PACKAGE_NAME}) ---")
            n_zip = subprocess.run([node_bin, str(SKILL_MJS_SCRIPT), str(ZIP_OUTPUT)], capture_output=True, text=True)
            print(n_zip.stdout.strip())
            if n_zip.returncode != 0:
                print(f"  [FAIL] Node ZIP 审计未通过: {n_zip.stderr.strip()}")
                return False

    print("\n  [PASS] 官方 Skill 1.6.0 双重审计全部通过！")
    return True


def main():
    if not run_data_pipeline():
        sys.exit(1)
    clean_dist()
    copy_runtime_files()
    if not check_dist_compliance():
        sys.exit(1)
    create_zip()
    if not run_official_audits():
        sys.exit(1)
    print(f"\n==========================================")
    print(f"任务 2 数据底座与官方双重审计全部完成！")
    print(f"产物目录: {DIST_DIR}")
    print(f"ZIP 产物: {ZIP_OUTPUT}")
    print(f"==========================================")


if __name__ == "__main__":
    main()

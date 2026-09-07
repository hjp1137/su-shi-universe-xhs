#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务14.1 最终包验证脚本分支与退出码自动化测试
断言 verify_final_package.py 在各种异常情况下退出码必须非0，正常情况下必须为0
"""

import os
import sys
import subprocess
import zipfile
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
VERIFY_SCRIPT = PROJECT_ROOT / "scripts" / "verify_final_package.py"
TEMP_TEST_DIR = PROJECT_ROOT / "dist" / "temp_test_zips"


def test_branches():
    print("=== [测试] verify_final_package.py 退出码与分支覆盖 ===")
    TEMP_TEST_DIR.mkdir(parents=True, exist_ok=True)

    try:
        # 分支 1: 正式合规 ZIP 存在 -> 必须 exit 0
        print("\n--- 测试 1: 正式合规 ZIP 存在 -> 期望 exit 0 ---")
        res1 = subprocess.run([sys.executable, str(VERIFY_SCRIPT)], capture_output=True, text=True)
        print(f"实际退出码: {res1.returncode}")
        assert res1.returncode == 0, f"正式合规包验证失败，退出码非0: {res1.returncode}"
        print("[PASS] 测试 1 通过！")

        # 分支 2: ZIP 不存在 -> 必须 exit != 0 (通常为 1)
        print("\n--- 测试 2: ZIP 文件不存在 -> 期望 exit != 0 ---")
        non_existent_zip = TEMP_TEST_DIR / "absolutely_not_exist.zip"
        if non_existent_zip.exists():
            non_existent_zip.unlink()
        res2 = subprocess.run([sys.executable, str(VERIFY_SCRIPT), str(non_existent_zip)], capture_output=True, text=True)
        print(f"实际退出码: {res2.returncode}")
        assert res2.returncode != 0, f"ZIP不存在时退出码错误为0！res: {res2.stdout}"
        assert "[FAIL] ZIP 产物不存在" in res2.stdout, "输出未包含不存在提示"
        print("[PASS] 测试 2 通过（ZIP 不存在分支正确退出 1）！")

        # 分支 3: ZIP 根目录缺失 index.html -> 必须 exit != 0
        print("\n--- 测试 3: ZIP 根目录缺失 index.html -> 期望 exit != 0 ---")
        no_index_zip = TEMP_TEST_DIR / "no_index.zip"
        with zipfile.ZipFile(no_index_zip, "w") as zf:
            zf.writestr("css/tokens.css", "/* mock tokens */")
        res3 = subprocess.run([sys.executable, str(VERIFY_SCRIPT), str(no_index_zip)], capture_output=True, text=True)
        print(f"实际退出码: {res3.returncode}")
        assert res3.returncode != 0, f"缺失 index.html 时退出码错误为0！"
        assert "ZIP 根目录缺失 index.html" in res3.stdout, "未捕获 index.html 缺失错误"
        print("[PASS] 测试 3 通过（缺失 index.html 分支正确退出 1）！")

        # 分支 4: ZIP 超过 10 MiB 硬门禁 -> 必须 exit != 0
        print("\n--- 测试 4: ZIP 超过 10 MiB 硬门禁 -> 期望 exit != 0 ---")
        oversize_zip = TEMP_TEST_DIR / "oversize.zip"
        with zipfile.ZipFile(oversize_zip, "w") as zf:
            zf.writestr("index.html", "<!DOCTYPE html><html><body>mock</body></html>")
            # 写入 10.5 MB 大小的数据（不压缩写入）
            zf.writestr("data/large_dummy.json", b"0" * (11 * 1024 * 1024), compress_type=zipfile.ZIP_STORED)
        res4 = subprocess.run([sys.executable, str(VERIFY_SCRIPT), str(oversize_zip)], capture_output=True, text=True)
        print(f"实际退出码: {res4.returncode}")
        assert res4.returncode != 0, f"ZIP超包体硬门禁时退出码错误为0！"
        assert "超过 10 MiB 硬门禁" in res4.stdout, "未捕获超包体硬门禁错误"
        print("[PASS] 测试 4 通过（超包体硬门禁分支正确退出 1）！")

    finally:
        # 清理测试产生的临时目录
        if TEMP_TEST_DIR.exists():
            for f in TEMP_TEST_DIR.iterdir():
                f.unlink()
            TEMP_TEST_DIR.rmdir()
        print("\n[CLEANUP] 临时测试包已安全清理")

    print("\n==========================================")
    print("ALL 4 VERIFY BRANCH TESTS PASSED (100%)!")
    print("==========================================")


if __name__ == "__main__":
    test_branches()

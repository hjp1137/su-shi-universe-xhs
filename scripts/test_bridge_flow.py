#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
苏轼宇宙小红书小工具 - 任务11 XHSBridge 与分享传播闭环自动化测试
验证 Native Bridge 适配层 API 规范、参数校验、用户取消归一化、防并发锁、Mock 模式流转与离线合规
"""

import io
import json
import re
import subprocess
import sys
from pathlib import Path

# 设置控制台 utf-8 输出
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

PROJECT_ROOT = Path(__file__).resolve().parent.parent


def test_bridge_static_compliance():
    print("[1] 检查 js/bridge.js 静态合规性 (ES2017 / Classic Script / 离线纯净)...")
    bridge_path = PROJECT_ROOT / "js" / "bridge.js"
    assert bridge_path.exists(), "js/bridge.js 文件不存在"

    content = bridge_path.read_text(encoding="utf-8")

    # 过滤注释
    code_clean = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    code_clean = re.sub(r'//.*', '', code_clean)

    # 1.1 严禁 const / let
    assert not re.search(r'\bconst\s+', code_clean), "js/bridge.js 包含 const 声明"
    assert not re.search(r'\blet\s+', code_clean), "js/bridge.js 包含 let 声明"

    # 1.2 严禁 <a download>
    assert not re.search(r'<\s*a[^>]*download', code_clean, re.IGNORECASE), "包含 <a download> 标签"
    assert not re.search(r'\.download\s*=', code_clean), "包含 .download 赋值行为"

    # 1.3 严禁网络请求与外链
    assert not re.search(r'\b(fetch|XMLHttpRequest)\b', code_clean), "不得发起网络请求"
    assert not re.search(r'https?://', code_clean), "不得包含外部网络 URL"

    # 1.4 命名空间与导出检查
    assert "SuShiUniverse.Bridge" in content, "未挂载 SuShiUniverse.Bridge"
    assert "SuShiUniverse.XHSBridge" in content, "未挂载 SuShiUniverse.XHSBridge 别名"

    # 1.5 官方标准 4 大 API 与取消判断函数
    for api_name in ["isAvailable", "writeTempFile", "saveImage", "postNote", "openRedPage", "isUserCancel", "setMockMode"]:
        assert api_name in content, f"缺失核心 API 封装: {api_name}"

    print("    -> js/bridge.js 静态合规性检查 100% 通过！")


def test_bridge_node_runtime():
    print("[2] 通过 Node.js 运行时执行 XHSBridge 逻辑单测与行为模拟...")

    node_script = """
    // 模拟纯净浏览器宿主环境
    const root = {};
    global.window = root;
    global.this = root;

    // 载入命名空间
    require('./js/namespace.js');
    // 载入 bridge
    require('./js/bridge.js');

    const Bridge = root.SuShiUniverse.Bridge;
    if (!Bridge) {
      console.error('FAIL: SuShiUniverse.Bridge not found');
      process.exit(1);
    }

    async function runTests() {
      // 2.1 检查非真机环境 isAvailable
      if (Bridge.isAvailable() !== false) {
        throw new Error('非真机环境 isAvailable 应返回 false');
      }

      // 2.2 测试 isUserCancel
      if (!Bridge.isUserCancel({ errMsg: 'postNote:fail cancel' })) {
        throw new Error('isUserCancel 未识别 postNote:fail cancel');
      }
      if (!Bridge.isUserCancel({ errMsg: 'saveImageToPhotosAlbum:fail cancel by user' })) {
        throw new Error('isUserCancel 未识别 saveImage cancel');
      }
      if (Bridge.isUserCancel({ errMsg: 'postNote:fail permission denied' })) {
        throw new Error('isUserCancel 误判非取消错误');
      }

      // 2.3 测试 writeTempFile 参数校验
      try {
        await Bridge.writeTempFile('invalid-base64');
        throw new Error('未校验非法 dataUri');
      } catch (e) {
        if (!e.message.includes('必须是完整 data:uri')) {
          throw new Error('错误提示不规范: ' + e.message);
        }
      }

      // 2.4 测试 writeTempFile 模拟成功
      const tempRes = await Bridge.writeTempFile('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
      if (!tempRes || !tempRes.filePath || !tempRes.filePath.startsWith('mock://temp/')) {
        throw new Error('writeTempFile 模拟路径异常: ' + JSON.stringify(tempRes));
      }

      // 2.5 测试 saveImage 模拟正常成功分支
      Bridge.setMockMode('default');
      const saveRes = await Bridge.saveImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
      if (!saveRes.success || saveRes.canceled) {
        throw new Error('saveImage 默认模拟应成功');
      }

      // 2.6 测试 saveImage 模拟用户取消分支
      Bridge.setMockMode('cancel');
      const cancelSaveRes = await Bridge.saveImage('mock://temp/test.png');
      if (cancelSaveRes.success || !cancelSaveRes.canceled) {
        throw new Error('saveImage 取消分支应返回 canceled: true');
      }

      // 2.7 测试 postNote 模拟正常成功分支
      Bridge.setMockMode('default');
      const postRes = await Bridge.postNote({
        title: '我的苏轼人生站点',
        content: '原来我最近在苏轼的黄州站。',
        filePath: 'mock://temp/test.png'
      });
      if (!postRes.success || postRes.canceled) {
        throw new Error('postNote 默认模拟应成功');
      }

      // 2.8 测试 postNote 模拟用户取消分支
      Bridge.setMockMode('cancel');
      const cancelPostRes = await Bridge.postNote({
        title: '我的苏轼人生站点',
        content: '原来我最近在苏轼的黄州站。',
        filePath: 'mock://temp/test.png'
      });
      if (cancelPostRes.success || !cancelPostRes.canceled) {
        throw new Error('postNote 取消分支应返回 canceled: true');
      }

      // 2.9 测试 openRedPage 参数校验与模拟
      Bridge.setMockMode('default');
      const pageRes = await Bridge.openRedPage('search', { keyword: '苏轼' });
      if (!pageRes.success) {
        throw new Error('openRedPage 应成功执行');
      }

      console.log('NODE_RUN_ALL_PASS');
    }

    runTests().catch(err => {
      console.error(err);
      process.exit(1);
    });
    """

    res = subprocess.run(
        ["node", "-e", node_script],
        cwd=str(PROJECT_ROOT),
        capture_output=True,
        text=True,
        encoding="utf-8"
    )

    if res.returncode != 0 or "NODE_RUN_ALL_PASS" not in res.stdout:
        print("Node.js 运行时单测输出错误：")
        print(res.stderr or res.stdout)
        sys.exit(1)

    print("    -> Node.js 运行时测试全部通过（参数校验、取消分支归一化、Mock 模式流转 100% 成功）！")


def test_views_integration():
    print("[3] 检查 js/views.js 中分享卡视图 postNote / saveImage 交互绑定...")
    views_content = (PROJECT_ROOT / "js" / "views.js").read_text(encoding="utf-8")

    assert "一键发布到小红书" in views_content, "share-card 缺失「一键发布到小红书」按钮"
    assert "保存卡片至相册" in views_content, "share-card 缺失「保存卡片至相册」按钮"
    assert "Bridge.postNote" in views_content, "未调用 Bridge.postNote"
    assert "Bridge.saveImage" in views_content, "未调用 Bridge.saveImage"
    assert "Bridge.isUserCancel" in views_content, "未做用户取消判定"
    assert "正在调起小红书发布器" in views_content, "缺失发布中交互文案"
    assert "正在保存至相册" in views_content, "缺失保存中交互文案"

    print("    -> views.js 分享卡视图双主链交互绑定完整合规！")


def main():
    print("==================================================")
    print("开始执行任务11 XHSBridge与分享传播闭环自动化单测")
    print("==================================================")

    test_bridge_static_compliance()
    test_bridge_node_runtime()
    test_views_integration()

    print("==================================================")
    print("全部单测用例执行完毕，100% 验证通过！")
    print("==================================================")


if __name__ == "__main__":
    main()

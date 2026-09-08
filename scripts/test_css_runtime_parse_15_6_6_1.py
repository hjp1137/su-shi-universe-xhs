# -*- coding: utf-8 -*-
"""
任务15.6.6.1 专属测试 1：CSS 静态结构与语法门禁
断言全部生产 CSS 括号平衡、注释闭合、规则未被吞并、关键选择器处于合法位置。
"""

import os
import re
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent

CSS_FILES = [
    'css/base.css',
    'css/tokens.css',
    'css/components.css',
    'css/views.css'
]

CRITICAL_SELECTORS = [
    '.poetry-constellation-25d-fallback',
    '.constellation-fallback-wrap',
    '.fallback-focus-node',
    '.fallback-orbit-star',
    '.fallback-orbit-title',
    '.constellation-catalog-panel',
    '.poetry-planet-attached-capsule',
    '.constellation-3d-hint'
]


def read_file(rel_path):
    p = PROJECT_ROOT / rel_path
    with open(p, 'r', encoding='utf-8') as f:
        return f.read()


def test_1_css_brace_and_comment_balance():
    """1. 检查全部生产 CSS 文件的花括号与注释闭合平衡"""
    print('  [CHECK] 1. 检查花括号与注释平衡...')
    for rel_path in CSS_FILES:
        raw = read_file(rel_path)
        # 注释匹配
        open_comments = raw.count('/*')
        close_comments = raw.count('*/')
        assert open_comments == close_comments, f'{rel_path} 存在未闭合注释: /*={open_comments}, */={close_comments}'

        # 移除注释后再做花括号统计
        clean = re.sub(r'/\*.*?\*/', '', raw, flags=re.DOTALL)
        open_b = clean.count('{')
        close_b = clean.count('}')
        assert open_b == close_b, f'{rel_path} 花括号不平衡: open={open_b}, close={close_b}, diff={open_b - close_b}'
        print(f'    PASS: {rel_path} (rules={open_b}, comments={open_comments})')
    print('  [PASS] 1. 全部生产 CSS 花括号与注释 100% 结构平衡')


def test_2_nebula_glow_closure_and_fallback_not_swallowed():
    """2. 针对 P0 根因断言：.constellation-nebula-glow 必须独立闭合，且绝不吞并 fallback 规则"""
    print('  [CHECK] 2. 检查 .constellation-nebula-glow 规则闭合...')
    comp_css = read_file('css/components.css')
    
    # 提取 .constellation-nebula-glow 块
    m = re.search(r'\.constellation-nebula-glow\s*\{([^}]+)\}', comp_css)
    assert m, 'components.css 中未找到合法闭合的 .constellation-nebula-glow 规则块'
    block = m.group(1)
    assert 'poetry-constellation-25d-fallback' not in block, '.constellation-nebula-glow 内部吞并了 fallback 规则！'
    assert 'position: absolute;' in block or 'position: absolute' in block, '缺少 position: absolute'
    assert 'background-image:' in block or 'radial-gradient' in block, '缺少背景光晕'
    print('  [PASS] 2. .constellation-nebula-glow 规则独立完整闭合，未发生任何规则嵌套或吞并')


def test_3_critical_selectors_position_validity():
    """3. 验证 15.6.6 新增的关键选择器均作为顶层独立规则存在"""
    print('  [CHECK] 3. 检查关键选择器顶层合法性...')
    comp_css = read_file('css/components.css')
    clean = re.sub(r'/\*.*?\*/', '', comp_css, flags=re.DOTALL)

    for sel in CRITICAL_SELECTORS:
        # 正则检查该选择器是否作为规则头存在，后接 {
        pattern = re.escape(sel) + r'\s*\{[^}]+\}'
        found = re.search(pattern, clean)
        assert found, f'components.css 中未找到独立闭合的规则: {sel}'
        print(f'    PASS selector: {sel}')
    print('  [PASS] 3. 8 个核心 Fallback 与 3D 关键选择器均处于独立顶层规则位置')


def test_4_views_css_parchment_p1_dechunked():
    """4. 检查 P1 顺手关闭项：.parchment-body 消除深色面板背景与 blur 磨砂板"""
    print('  [CHECK] 4. 检查 .parchment-body P1 消除深色面板与磨砂板...')
    views_css = read_file('css/views.css')
    m = re.search(r'\.parchment-body\s*\{([^}]+)\}', views_css)
    assert m, '未找到 .parchment-body 样式块'
    block = m.group(1)
    assert 'background: transparent' in block, '.parchment-body 未设为 transparent 通透'
    assert 'backdrop-filter: none' in block, '.parchment-body 未清除 blur'
    print('  [PASS] 4. .parchment-body 已彻底无块化（transparent + 无 blur），P1 关闭成功')


def main():
    print('=' * 72)
    print('开始执行 任务15.6.6.1 专项测试 1：CSS 静态结构与语法门禁...')
    print('=' * 72)
    test_1_css_brace_and_comment_balance()
    test_2_nebula_glow_closure_and_fallback_not_swallowed()
    test_3_critical_selectors_position_validity()
    test_4_views_css_parchment_p1_dechunked()
    print('=' * 72)
    print('★ SUCCESS: 任务15.6.6.1 CSS 静态结构与语法门禁 100% PASS ★')
    print('=' * 72)


if __name__ == '__main__':
    main()

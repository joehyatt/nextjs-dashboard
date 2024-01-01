import AppKit
import time
import sys
import subprocess
import pyautogui
import pyperclip
from datetime import datetime,date,timedelta

cid = sys.argv[1]     # チェックイン日(YYYY-MM-DD):String
check_in_date_dt = datetime.strptime(cid, '%Y-%m-%d')   # チェックイン日:Datetime
check_out_date_dt = datetime.strptime(cid, '%Y-%m-%d') + timedelta(days=1) # チェックアウト日:Datetime
cod = check_out_date_dt.strftime('%Y-%m-%d')   # チェックアウト日(YYYY-MM-DD):String
q_range = int(sys.argv[2])      # 検索日数
html = ""

for i in range(q_range):
    # ChromeでURLを開く
    search_url = f'https://www.hyatt.com/ja-JP/search/Japan?checkinDate={cid}&checkoutDate={cod}'
    cmd=["open", "-a", "/Applications/Google Chrome.app", search_url]
    subprocess.call(cmd)
    time.sleep(20)
    # Inspecterのconsoleタブを開く
    pyautogui.hotkey('option', 'command', 'j')
    time.sleep(3)
    # Elementタブに移動
    pyautogui.hotkey('command', '[')
    time.sleep(1)
    pyautogui.press('up')
    pyautogui.press('up')
    time.sleep(1)
    # HTMLをコピー
    pyautogui.hotkey('command', 'c')
    time.sleep(1)
    html = str(pyperclip.paste())

    with open(f'html/hyatt_{cid}.html', "w") as f:
        f.write(html)

    # Chromeタブを閉じる
    pyautogui.hotkey('command', 'w')

    # チェックイン／アウト月日を1日分ずらす
    check_in_date_dt = datetime.strptime(cid, '%Y-%m-%d') + timedelta(days=1)
    cid = check_in_date_dt.strftime('%Y-%m-%d')
    check_out_date_dt = datetime.strptime(cod, '%Y-%m-%d') + timedelta(days=1)
    cod = check_out_date_dt.strftime('%Y-%m-%d') 
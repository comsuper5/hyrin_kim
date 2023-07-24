# 백엔드 서버 만들어 보기
from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.staticfiles import StaticFiles
from typing import Annotated
import sqlite3

con = sqlite3.connect('whynot.db', check_same_thread=False)
cur = con.cursor()
app = FastAPI()


# 서버 만들어주기 서버쪽에 title, image값 등등을 보내주고 성공 시, 200을 보내주는 소스코드
@app.post("/why")
async def create_itme(title: Annotated[str, Form()],
                      description: Annotated[str, Form()],
                      insertAt: Annotated[int, Form()]
                      ):
    cur.execute(f"""
                INSERT INTO why(title,description,insertAt)
                VALUES ('{title}','{description}',{insertAt})            
                """)
    con.commit()

    return '200'

# 데이터 가져오기


@app.get('/why')
async def get_items():
    con.row_factory = sqlite3.Row  # 컬럼명도 같이 불러오는 문법
    cur = con.cursor()  # 현재 위치를 업데이트DB
    rows = cur.execute(f"""
                       SELECT * FROM why;
                       """).fetchall()
    return JSONResponse(jsonable_encoder(dict(row) for row in rows))  # 그냥 rows로 보내게 되면 코드가 어마어마하게 길어짐
# dict로 해주면 됨


# 서빙하는 작업이라 항상 아래에 있어야 한다.
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")

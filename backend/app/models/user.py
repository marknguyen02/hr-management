from pydantic import BaseModel

class User(BaseModel):
    fullname: str
    username: str
    password: str
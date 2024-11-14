from fastapi import APIRouter, HTTPException
from app.services.user_service import get_all_accounts, get_account_by_username
from app.models.login_request import LoginRequest

router = APIRouter()

@router.get("/accounts/")
def read_info_accounts():
    users = get_all_accounts()
    if not users:
        raise HTTPException(status_code=404, detail="No users found")
    return users

@router.post("/login/")
def login(request: LoginRequest):
    user = get_account_by_username(request.username)
    
    if user is None or user.password != request.password:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    return {"message": "Login successful", "user": user}
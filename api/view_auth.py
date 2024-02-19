import json
from django.contrib.auth import authenticate, login, logout
from django.http import JsonReponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST


@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get("username")
    password = data.get("password")

    if username is None or password is None:
        return JsonReponse({"detail": "Plaeas provide username and password"})
    user = authenticate(username=username, password=password)
    if user is None:
        return JsonReponse({"detail": "invalid credentials"}, status=400)
    login(request, user)
    return JsonReponse({"details: Succesfully logged in!"})


def Logout_view(request):
    if not request.user.is_authenticated:
        return JsonReponse({"details": "You are not logged in!"})
    logout(request)
    return JsonReponse({"details: Succesfully logged out!"})


def session_view(request):
    if not request.user.is_authenticated:
        return JsonReponse({"isAuthenticated": False})
    return JsonReponse({"isAuthenticated": True})


def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonReponse({"isAuthenticated": False})
    return JsonReponse({"username": request.user.username})

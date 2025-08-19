from pathlib import Path
import os
import environ
import dj_database_url

# -------------------------
# Base directory
# -------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

# -------------------------
# Environment variables
# -------------------------
env = environ.Env()
environ.Env.read_env()  # reads from .env file or Render’s environment

SECRET_KEY = env("SECRET_KEY", default="insecure-secret-key")  # fallback only for dev
DEBUG = env.bool("DEBUG", default=False)

ALLOWED_HOSTS = ["*"]   # in production, set to ["your-backend.onrender.com"]

# -------------------------
# Installed apps
# -------------------------
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party
    'rest_framework',
    'corsheaders',

    # Local apps
    'api',
]

# -------------------------
# Middleware
# -------------------------
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',   # ✅ for static files
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, "templates")],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# -------------------------
# Database (from env)
# -------------------------
DATABASES = {
    "default": dj_database_url.config(
        default=env("DATABASE_URL", default="postgres://postgres:Sriram@localhost:5432/breakup_tracker")
    )
}

# -------------------------
# Password validation
# -------------------------
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# -------------------------
# i18n
# -------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# -------------------------
# Static & Media
# -------------------------
STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]  # for local dev
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")    # for collectstatic

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# -------------------------
# Django REST Framework
# -------------------------
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',  # dev only, tighten in prod
    ]
}

# -------------------------
# CORS (frontend-backend connect)
# -------------------------
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://your-frontend.vercel.app",   # ✅ update with actual Vercel domain
]
CORS_ALLOW_CREDENTIALS = True

# -------------------------
# Security (Production)
# -------------------------
CSRF_TRUSTED_ORIGINS = [
    "https://breakup-recovery-progress-tracker-1.onrender.com",
    "https://breakup-recovery-progress-tracker.onrender.com",
]
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

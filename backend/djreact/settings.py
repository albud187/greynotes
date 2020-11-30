"""
Django settings for djreact project.

Generated by 'django-admin startproject' using Django 3.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from pathlib import Path
import os
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

FRONTEND_DIR = os.path.join(BASE_DIR.parent, 'frontend')
BUILD_DIR = os.path.join(FRONTEND_DIR, 'build')

BACKEND_FOLDER = os.path.join(BASE_DIR.parent, 'backend')
BACKEND_TEMPLATES_DIR = os.path.join(BACKEND_FOLDER, 'backend_templates')
print(BACKEND_TEMPLATES_DIR)

admin_codes_dir = os.path.join(BASE_DIR,'admin_codes.txt')

codes = open(admin_codes_dir,'r')
codes_content = codes.read()
codes_content_list = codes_content.split('\n')
codes_content_dict = {}
for item in codes_content_list:
    try:
        KEY = item.split(':')[0]
        VALUE = item.split(':')[1]
        codes_content_dict[KEY]=VALUE
    except:
        pass

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = codes_content_dict['SECRET_KEY']

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'crispy_forms',
    'bootstrap4',

    'rest_framework',
    'corsheaders',
    'articles',
    'user_api',


    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',

    'rest_auth',
    'rest_auth.registration',
    'rest_framework.authtoken',

]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'djreact.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BUILD_DIR, BACKEND_TEMPLATES_DIR],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'djreact.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
'DEFAULT_PERMISSION_CLASSES': [
   'rest_framework.permissions.AllowAny',
]
}

CORS_ORIGIN_ALLOW_ALL = True


STATICFILES_DIRS = [os.path.join(BUILD_DIR,'static')]

# ACCOUNT_EMAIL_REQUIRED = True
# ACCOUNT_AUTHENTICATION_METHOD = 'username'
# ACCOUNT_EMAIL_VERIFICATION = 'none'

CSRF_COOKIE_NAME = "XSRF-TOKEN"

EMAIL_HOST=codes_content_dict['EMAIL_HOST']
EMAIL_HOST_USER=codes_content_dict['EMAIL_HOST_USER']
EMAIL_HOST_PASSWORD=codes_content_dict['EMAIL_HOST_PASSWORD']
EMAIL_USE_TLS=True
EMAIL_PORT=587

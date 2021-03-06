from django.shortcuts import render,redirect
from django.views.generic import View
from django.contrib import messages
from validate_email import validate_email
from django.contrib.auth.models import User

from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes,force_text,DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils import generate_token
from django.core.mail import EmailMessage

from django.conf import settings
from django.contrib.auth import authenticate, login, logout


# Create your views here.

site_domain = '127.0.0.1:8000'

class RegistrationView(View):
    def get(self, request):
        return render(request, 'auth/register.html')

    def post(self, request):
        context = {
        'data':request.POST,
        'has_error':False
        }

        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        password2 = request.POST.get('password2')

        if len(password)<6:
            messages.add_message(request, messages.ERROR,'password must be atleast 6 characters long')
            context['has_error']=True
        if password!=password2:
            messages.add_message(request, messages.ERROR, 'passwords dont match')
            context['has_error']=True

        if not validate_email(email):
            messages.add_message(request,messages.ERROR,'Please provide a valid email')
            context['has_error']=True

        try:
            if User.objects.filter(email=email):
                messages.add_message(request, messages.ERROR, 'email is taken')
                context['has_error']=True


        except Exception as identifier:
            pass

            try:
                if User.objects.filter(username=username).exist():
                    messages.add_message(request, messages.ERROR, 'username is taken')
                    context['has_error']=True

            except Exception as identifier:
                pass

        if context['has_error']:
            return render(request,'auth/register.html',context)

        user = User.objects.create_user(username=username, email = email)
        user.set_password(password)
        user.is_active=False

        user.save()

        email_subject = 'Grey Notes Account Activation'
        message=render_to_string('auth/activate.html',
        {
        'user':user,
        'domain':site_domain,
        'uid':urlsafe_base64_encode(force_bytes(user.pk)),
        'token': generate_token.make_token(user)
        })


        email_message = EmailMessage(
        email_subject,
        message,
        settings.EMAIL_HOST_USER,
        [email])

        email_message.send()

        messages.add_message(request, messages.SUCCESS, 'account created succesfully')

        return render(request,'auth/success-register.html')

class ActivateAccountView(View):
    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except Exception as identifier:
            user = None
        if user is not None and generate_token.check_token(user, token):
            user.is_active = True
            user.save()
            messages.add_message(request, messages.SUCCESS,
                                 'account activated successfully')
            return render(request, 'auth/success-activated.html')
        return render(request, 'auth/activate_failed.html', status=401)

class RequestResetEmailView(View):
    def get(self, request):
        return render(request,'auth/request-reset-email.html')
    def post(self, request):
        email=request.POST['email']

        if not validate_email(email):
            messages.error(request,'Please enter a valid email')
            return render(request, 'auth/request-reset-email.html')

        user=User.objects.filter(email=email)

        if user.exists():
            # current_site = get_current_site(request)
            email_subject = 'Grey Notes Account Password Reset'
            message=render_to_string('auth/reset-user-password.html',
            {
            'domain':site_domain,
            'uid':urlsafe_base64_encode(force_bytes(user[0].pk)),
            'token': PasswordResetTokenGenerator().make_token(user[0])
            })


            email_message = EmailMessage(
            email_subject,
            message,
            settings.EMAIL_HOST_USER,
            [email])

            email_message.send()

        messages.success(request, 'we have sent you an email with instructions to reset your password')
        return render(request, 'auth/request-reset-email.html')
        # return render(request,'auth/login.html')

class SetNewPasswordView(View):
    def get(self, request, uidb64, token):
        context = {
            'uidb64': uidb64,
            'token': token
        }

        try:
            user_id = force_text(urlsafe_base64_decode(uidb64))

            user = User.objects.get(pk=user_id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                messages.info(
                    request, 'Password reset link, is invalid, please request a new one')
                return render(request, 'auth/request-reset-email.html')

        except DjangoUnicodeDecodeError as identifier:
            messages.success(
                request, 'Invalid link')
            return render(request, 'auth/request-reset-email.html')

        return render(request, 'auth/set-new-password.html', context)

    def post(self, request, uidb64, token):
        context = {
            'uidb64': uidb64,
            'token': token,
            'has_error': False
        }

        password = request.POST.get('password')
        password2 = request.POST.get('password2')
        if len(password) < 6:
            messages.add_message(request, messages.ERROR,
                                 'passwords should be at least 6 characters long')
            context['has_error'] = True
        if password != password2:
            messages.add_message(request, messages.ERROR,
                                 'passwords don`t match')
            context['has_error'] = True

        if context['has_error'] == True:
            return render(request, 'auth/set-new-password.html', context)

        try:
            user_id = force_text(urlsafe_base64_decode(uidb64))

            user = User.objects.get(pk=user_id)
            user.set_password(password)
            user.save()

            messages.success(
                request, 'Password reset success, you can login with new password')

            return render(request,'auth/success-password-reset.html')

        except DjangoUnicodeDecodeError as identifier:
            messages.error(request, 'Something went wrong')
            return render(request, 'auth/set-new-password.html', context)

        return render(request, 'auth/set-new-password.html', context)

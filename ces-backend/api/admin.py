from django.contrib import admin
from django.contrib.auth.hashers import make_password
from .models import Account

class TblAccountsAdmin(admin.ModelAdmin):
    list_display = ('accountID', 'name', 'hashed_password', 'accountType', 'department', 'position', 'activationDate', 'deactivationDate', 'status')

    search_fields = ('accountID', 'accountType', 'status')

    list_filter = ('accountType', 'status', 'activationDate')

    fieldsets = (
        (None, {
            'fields': ('accountID', 'name', 'password', 'accountType', 'department', 'position', 'activationDate', 'deactivationDate', 'status')
        }),
    )

    readonly_fields = ('accountID',)

    def save_model(self, request, obj, form, change):
        if form.cleaned_data.get('password') and form.cleaned_data['password'] != obj.password:
            obj.password = make_password(form.cleaned_data['password'])
        super().save_model(request, obj, form, change)

    def hashed_password(self, obj):
        return obj.password
    hashed_password.short_description = 'Password'

# Register the model
admin.site.register(Account, TblAccountsAdmin)
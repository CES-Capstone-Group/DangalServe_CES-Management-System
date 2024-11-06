# Generated by Django 5.0.7 on 2024-11-06 15:45

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models
from django.utils import timezone
from django.contrib.auth.hashers import make_password

def create_default_admin_account(apps, schema_editor):
    # Get the Account and AdminAccount models from the historical version of the app registry
    Account = apps.get_model('api', 'Account')
    AdminAccount = apps.get_model('api', 'AdminAccount')
    
    # Create the default admin account
    admin_account = Account.objects.create(
        username="Anna",
        password=make_password("Anna123"),  # Make sure the password is hashed
        accountType="Admin",
        position="Administrator",
        status="Active",
        activationDate=timezone.now().date(),
        deactivationDate=None  # No deactivation date initially
    )
    
    # Create the related AdminAccount entry
    AdminAccount.objects.create(
        account=admin_account,  # Reference the admin_account object created earlier
        name="Anna-Liza F. Sigue"
    )

class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=255, unique=True)),
                ('password', models.CharField(max_length=255)),
                ('accountType', models.CharField(max_length=255)),
                ('position', models.CharField(max_length=255)),
                ('status', models.CharField(max_length=50)),
                ('activationDate', models.DateField()),
                ('deactivationDate', models.DateField(blank=True, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Achievement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('award_title', models.CharField(max_length=255)),
                ('awardee', models.CharField(max_length=255)),
                ('awarded_by', models.CharField(max_length=255)),
                ('date_awarded', models.DateField()),
                ('image', models.ImageField(blank=True, max_length=255, null=True, upload_to='awards/')),
            ],
        ),
        migrations.CreateModel(
            name='Announcement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('details', models.TextField()),
                ('image', models.ImageField(blank=True, null=True, upload_to='announcements/')),
            ],
        ),
        migrations.CreateModel(
            name='Barangay',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('brgy_name', models.CharField(max_length=100)),
                ('moa', models.FileField(blank=True, null=True, upload_to='moa_files/')),
            ],
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('dept_id', models.AutoField(primary_key=True, serialize=False)),
                ('dept_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('file', models.FileField(upload_to='documents/')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='ResearchAgenda',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(blank=True, max_length=255, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='research_agenda_images/')),
            ],
        ),
        migrations.CreateModel(
            name='AdminAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('account', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='BrgyOfficialAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('account', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('barangay', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.barangay')),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('course_id', models.AutoField(primary_key=True, serialize=False)),
                ('course_name', models.CharField(max_length=100)),
                ('dept', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses', to='api.department')),
            ],
        ),
        migrations.CreateModel(
            name='EvaluatorAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('evaluator_type', models.CharField(max_length=50)),
                ('account', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='AlumniEvaluator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('contact_number', models.CharField(max_length=15)),
                ('course', models.CharField(max_length=255)),
                ('department', models.CharField(max_length=255)),
                ('username', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
                ('evaluator', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.evaluatoraccount')),
            ],
        ),
        migrations.CreateModel(
            name='ExternalParticipantEvaluator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('contact_number', models.CharField(max_length=15)),
                ('barangay', models.CharField(max_length=255)),
                ('username', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
                ('evaluator', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.evaluatoraccount')),
            ],
        ),
        migrations.CreateModel(
            name='FacultyEvaluator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('contact_number', models.CharField(max_length=15)),
                ('department', models.CharField(max_length=255)),
                ('position', models.CharField(max_length=255)),
                ('username', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
                ('evaluator', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.evaluatoraccount')),
            ],
        ),
        migrations.CreateModel(
            name='ProponentAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('account', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('course', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.course')),
                ('department', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.department')),
            ],
        ),
        migrations.CreateModel(
            name='Proposal',
            fields=[
                ('is_three_year_plan', models.BooleanField(default=False)),
                ('is_one_year_plan', models.BooleanField(default=False)),
                ('proposal_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('engagement_date', models.DateField()),
                ('disengagement_date', models.DateField()),
                ('department', models.CharField(max_length=255)),
                ('lead_proponent', models.CharField(max_length=255)),
                ('contact_details', models.CharField(max_length=255)),
                ('project_description', models.TextField()),
                ('target_date', models.DateField()),
                ('location', models.CharField(max_length=255)),
                ('partner_community', models.CharField(max_length=255)),
                ('school', models.BooleanField(default=False)),
                ('barangay', models.BooleanField(default=False)),
                ('government_org', models.CharField(blank=True, max_length=255, null=True)),
                ('non_government_org', models.CharField(blank=True, max_length=255, null=True)),
                ('identified_needs_text', models.TextField(blank=True, null=True)),
                ('identified_needs_file', models.FileField(blank=True, null=True, upload_to='Proposals/identified_needs/')),
                ('general_objectives', models.TextField()),
                ('specific_objectives', models.TextField()),
                ('success_indicators', models.TextField()),
                ('cooperating_agencies', models.TextField()),
                ('monitoring_mechanics', models.TextField()),
                ('evaluation_mechanics', models.TextField()),
                ('timetable', models.TextField()),
                ('risk_assessment', models.TextField()),
                ('action_plans', models.TextField()),
                ('sustainability_approaches', models.TextField()),
                ('budget_requirement_text', models.TextField(blank=True, null=True)),
                ('budget_requirement_file', models.FileField(blank=True, null=True, upload_to='Proposals/budget_requirements/')),
                ('directorSignDate', models.DateField(blank=True, null=True)),
                ('VPRESignDate', models.DateField(blank=True, null=True)),
                ('PRESignDate', models.DateField(blank=True, null=True)),
                ('status', models.CharField(choices=[('Pending', 'Pending'), ('Approved by Director', 'Approved by Director'), ('Approved by VPRE', 'Approved by VPRE'), ('Approved by Barangay', 'Approved by Barangay'), ('Approved by President', 'Approved by President'), ('Partly Approved by Barangay', 'Partly Approved by Barangay'), ('Rejected', 'Rejected')], default='Pending', max_length=30)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Proponent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('position', models.CharField(max_length=255)),
                ('proposal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='proponents', to='api.proposal')),
            ],
        ),
        migrations.CreateModel(
            name='ActivitySchedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activity_title', models.CharField(max_length=255)),
                ('target_date', models.DateField()),
                ('target_time', models.TimeField(blank=True, null=True)),
                ('file', models.FileField(blank=True, max_length=25, null=True, upload_to='activity_files/')),
                ('proposal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.proposal')),
            ],
        ),
        migrations.CreateModel(
            name='ProposalVersion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('version_number', models.PositiveIntegerField()),
                ('title', models.CharField(max_length=255)),
                ('engagement_date', models.DateField()),
                ('disengagement_date', models.DateField()),
                ('department', models.CharField(max_length=255)),
                ('lead_proponent', models.CharField(max_length=255)),
                ('contact_details', models.CharField(max_length=255)),
                ('project_description', models.TextField()),
                ('target_date', models.DateField()),
                ('location', models.CharField(max_length=255)),
                ('partner_community', models.CharField(max_length=255)),
                ('school', models.BooleanField(default=False)),
                ('barangay', models.BooleanField(default=False)),
                ('government_org', models.CharField(blank=True, max_length=255, null=True)),
                ('non_government_org', models.CharField(blank=True, max_length=255, null=True)),
                ('identified_needs_text', models.TextField(blank=True, null=True)),
                ('identified_needs_file', models.FileField(blank=True, null=True, upload_to='Proposals/identified_needs/')),
                ('general_objectives', models.TextField()),
                ('specific_objectives', models.TextField()),
                ('success_indicators', models.TextField()),
                ('cooperating_agencies', models.TextField()),
                ('monitoring_mechanics', models.TextField()),
                ('evaluation_mechanics', models.TextField()),
                ('timetable', models.TextField()),
                ('risk_assessment', models.TextField()),
                ('action_plans', models.TextField()),
                ('sustainability_approaches', models.TextField()),
                ('budget_requirement_text', models.TextField(blank=True, null=True)),
                ('budget_requirement_file', models.FileField(blank=True, null=True, upload_to='Proposals/budget_requirements/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('version_status', models.CharField(choices=[('Pending', 'Pending'), ('Approved by Director', 'Approved by Director'), ('Approved by VPRE', 'Approved by VPRE'), ('Approved by Barangay', 'Approved by Barangay'), ('Approved by President', 'Approved by President'), ('Partly Approved by Barangay', 'Partly Approved by Barangay'), ('Rejected', 'Rejected')], default='Pending', max_length=30)),
                ('proposal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='versions', to='api.proposal')),
            ],
        ),
        migrations.AddField(
            model_name='proposal',
            name='current_version',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='active_proposal', to='api.proposalversion'),
        ),
        migrations.CreateModel(
            name='Signatory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('position', models.CharField(max_length=255)),
                ('section', models.CharField(choices=[('prepared', 'Prepared By'), ('endorsed', 'Endorsed By'), ('concurred', 'Concurred By')], max_length=20)),
                ('proposal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='signatories', to='api.proposal')),
            ],
        ),
        migrations.CreateModel(
            name='StudentEvaluator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('student_id', models.CharField(max_length=50)),
                ('student_email', models.EmailField(max_length=254)),
                ('contact_number', models.CharField(max_length=15)),
                ('course', models.CharField(max_length=255)),
                ('department', models.CharField(max_length=255)),
                ('username', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
                ('evaluator', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.evaluatoraccount')),
            ],
        ),
        migrations.CreateModel(
            name='BarangayApproval',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('barangay_name', models.CharField(max_length=255)),
                ('status', models.CharField(choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected')], default='Pending', max_length=20)),
                ('sign_date', models.DateField(blank=True, null=True)),
                ('remarks', models.TextField(blank=True, null=True)),
                ('proposal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='barangay_approvals', to='api.proposal')),
            ],
            options={
                'unique_together': {('proposal', 'barangay_name')},
            },
        ),
        migrations.RunPython(create_default_admin_account),
    ]

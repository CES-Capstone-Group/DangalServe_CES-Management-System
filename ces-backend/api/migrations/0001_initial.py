# Generated by Django 5.0.7 on 2024-11-14 15:49

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


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
                ('accountType', models.CharField(default='Proponent', max_length=255)),
                ('position', models.CharField(blank=True, max_length=255, null=True)),
                ('status', models.CharField(default='Active', max_length=50)),
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
                ('award_title', models.CharField(default='Unknown Award', max_length=255)),
                ('awardee', models.CharField(default='Unknown Awardee', max_length=255)),
                ('awarded_by', models.CharField(default='Unknown Awarded By', max_length=255)),
                ('date_awarded', models.DateField(default='0000-00-00')),
                ('image', models.ImageField(blank=True, max_length=255, null=True, upload_to='awards/')),
            ],
        ),
        migrations.CreateModel(
            name='Announcement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='Unknown Title', max_length=255)),
                ('details', models.TextField(default='Unknown Details')),
                ('image', models.ImageField(blank=True, null=True, upload_to='announcements/')),
            ],
        ),
        migrations.CreateModel(
            name='Barangay',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('brgy_name', models.CharField(default='Unknown Barangay', max_length=100)),
                ('moa', models.FileField(blank=True, null=True, upload_to='moa_files/')),
            ],
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('dept_id', models.AutoField(primary_key=True, serialize=False)),
                ('dept_name', models.CharField(default='Unknown Department', max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='Unknown Title', max_length=255)),
                ('file', models.FileField(upload_to='documents/')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='FileUpload',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(blank=True, null=True, upload_to='activities/')),
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
                ('name', models.CharField(default='Unknown Admin', max_length=255)),
                ('account', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='BrgyOfficialAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='Unknown Barangay', max_length=255)),
                ('account', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('barangay', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.barangay')),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('course_id', models.AutoField(primary_key=True, serialize=False)),
                ('course_name', models.CharField(default='Unknown Course', max_length=100)),
                ('dept', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses', to='api.department')),
            ],
        ),
        migrations.CreateModel(
            name='EvaluatorAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='Unknown Evaluator', max_length=255)),
                ('evaluator_type', models.CharField(max_length=50)),
                ('account', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='AlumniEvaluator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(default='alumni@example.com', max_length=254)),
                ('contact_number', models.CharField(default='0000000000', max_length=15)),
                ('course', models.CharField(default='Unknown Course', max_length=255)),
                ('department', models.CharField(default='Unknown Department', max_length=255)),
                ('evaluator', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.evaluatoraccount')),
            ],
        ),
        migrations.CreateModel(
            name='ExternalParticipantEvaluator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(default='external@example.com', max_length=254)),
                ('contact_number', models.CharField(default='0000000000', max_length=15)),
                ('barangay', models.CharField(default='Unknown Barangay', max_length=255)),
                ('evaluator', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.evaluatoraccount')),
            ],
        ),
        migrations.CreateModel(
            name='FacultyEvaluator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(default='faculty@example.com', max_length=254)),
                ('contact_number', models.CharField(default='0000000000', max_length=15)),
                ('department', models.CharField(default='Unknown Department', max_length=255)),
                ('position', models.CharField(default='Unknown Position', max_length=255)),
                ('evaluator', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.evaluatoraccount')),
            ],
        ),
        migrations.CreateModel(
            name='NonTeachingEvaluator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(default='nonteaching@example.com', max_length=254)),
                ('contact_number', models.CharField(default='0000000000', max_length=15)),
                ('position', models.CharField(default='Unknown Position', max_length=255)),
                ('department', models.CharField(default='Unknown Department', max_length=255)),
                ('evaluator', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.evaluatoraccount')),
            ],
        ),
        migrations.CreateModel(
            name='ProponentAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='Unknown Proponent', max_length=255)),
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
                ('title', models.CharField(default='Unknown Title', max_length=255)),
                ('engagement_date', models.DateField(default='0000-00-00')),
                ('disengagement_date', models.DateField(default='0000-00-00')),
                ('department', models.CharField(default='Unknown Department', max_length=255)),
                ('lead_proponent', models.CharField(default='Unknown Lead Proponent', max_length=255)),
                ('contact_details', models.CharField(default='00000000000', max_length=255)),
                ('project_description', models.TextField(default='Unknown Porject Descriptiojn')),
                ('target_date', models.DateField(default='0000-00-00')),
                ('location', models.CharField(default='Unknown Location', max_length=255)),
                ('partner_community', models.CharField(default='Unknown Parter Community', max_length=255)),
                ('school', models.BooleanField(default=False)),
                ('barangay', models.BooleanField(default=False)),
                ('government_org', models.CharField(blank=True, max_length=255, null=True)),
                ('non_government_org', models.CharField(blank=True, max_length=255, null=True)),
                ('identified_needs_text', models.TextField(blank=True, null=True)),
                ('identified_needs_file', models.FileField(blank=True, null=True, upload_to='Proposals/identified_needs/')),
                ('general_objectives', models.TextField(default='Unknown General Objectives')),
                ('specific_objectives', models.TextField(default='Unknown Specific Objectives')),
                ('success_indicators', models.TextField(default='Unknown Success Indicators')),
                ('cooperating_agencies', models.TextField(default='Unknown Cooperating Agencies')),
                ('monitoring_mechanics', models.TextField(default='Unknown Monitoring Mechanics')),
                ('evaluation_mechanics', models.TextField(default='Unknown Evaluation Mechanics')),
                ('timetable', models.TextField(default='Unknown Time Table')),
                ('risk_assessment', models.TextField(default='Unknown Risk Assessment')),
                ('action_plans', models.TextField(default='Unknown Action Plans')),
                ('sustainability_approaches', models.TextField(default='Unknown Sustainability Approaches')),
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
                ('name', models.CharField(default='Unknown Proponent', max_length=255)),
                ('position', models.CharField(default='Unknown Position', max_length=255)),
                ('proposal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='proponents', to='api.proposal')),
            ],
        ),
        migrations.CreateModel(
            name='ActivitySchedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activity_title', models.CharField(default='Activity Title', max_length=255)),
                ('target_date', models.DateField(default=django.utils.timezone.now)),
                ('target_time', models.TimeField(blank=True, default=None, null=True)),
                ('status', models.CharField(default='In Progress', max_length=50)),
                ('files', models.ManyToManyField(blank=True, to='api.fileupload')),
                ('proposal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.proposal')),
            ],
        ),
        migrations.CreateModel(
            name='ProposalVersion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('version_number', models.PositiveIntegerField(default=1)),
                ('title', models.CharField(default='Untitled Proposal', max_length=255)),
                ('engagement_date', models.DateField(default=django.utils.timezone.now)),
                ('disengagement_date', models.DateField(default=django.utils.timezone.now)),
                ('department', models.CharField(default='General Department', max_length=255)),
                ('lead_proponent', models.CharField(default='Lead Proponent', max_length=255)),
                ('contact_details', models.CharField(default='Contact Details', max_length=255)),
                ('project_description', models.TextField(default='Project Description')),
                ('target_date', models.DateField(default=django.utils.timezone.now)),
                ('location', models.CharField(default='Unknown Location', max_length=255)),
                ('partner_community', models.CharField(default='Community Name', max_length=255)),
                ('school', models.BooleanField(default=False)),
                ('barangay', models.BooleanField(default=False)),
                ('government_org', models.CharField(blank=True, default='Unknown Government Org', max_length=255, null=True)),
                ('non_government_org', models.CharField(blank=True, default='Unknown Non-Government Org', max_length=255, null=True)),
                ('identified_needs_text', models.TextField(blank=True, default='Needs Description', null=True)),
                ('identified_needs_file', models.FileField(blank=True, null=True, upload_to='Proposals/identified_needs/')),
                ('general_objectives', models.TextField(default='General Objectives')),
                ('specific_objectives', models.TextField(default='Specific Objectives')),
                ('success_indicators', models.TextField(default='Success Indicators')),
                ('cooperating_agencies', models.TextField(default='Cooperating Agencies')),
                ('monitoring_mechanics', models.TextField(default='Monitoring Mechanics')),
                ('evaluation_mechanics', models.TextField(default='Evaluation Mechanics')),
                ('timetable', models.TextField(default='Timetable')),
                ('risk_assessment', models.TextField(default='Risk Assessment')),
                ('action_plans', models.TextField(default='Action Plans')),
                ('sustainability_approaches', models.TextField(default='Sustainability Approaches')),
                ('budget_requirement_text', models.TextField(blank=True, default='Budget Requirements', null=True)),
                ('budget_requirement_file', models.FileField(blank=True, null=True, upload_to='Proposals/budget_requirements/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('version_status', models.CharField(choices=[('Pending', 'Pending'), ('Approved by Director', 'Approved by Director'), ('Approved by VPRE', 'Approved by VPRE'), ('Approved by Barangay', 'Approved by Barangay'), ('Approved by President', 'Approved by President'), ('Partly Approved by Barangay', 'Partly Approved by Barangay'), ('Rejected', 'Rejected')], default='Pending', max_length=30)),
                ('proposal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='versions', to='api.proposal')),
                ('research_agendas', models.ManyToManyField(blank=True, related_name='proposal_versions', to='api.researchagenda')),
            ],
        ),
        migrations.AddField(
            model_name='proposal',
            name='current_version',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='active_proposal', to='api.proposalversion'),
        ),
        migrations.AddField(
            model_name='proposal',
            name='research_agendas',
            field=models.ManyToManyField(blank=True, related_name='proposals', to='api.researchagenda'),
        ),
        migrations.CreateModel(
            name='Signatory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='Signatory Name', max_length=255)),
                ('position', models.CharField(default='Position', max_length=255)),
                ('section', models.CharField(choices=[('prepared', 'Prepared By'), ('endorsed', 'Endorsed By'), ('concurred', 'Concurred By')], default='prepared', max_length=20)),
                ('proposal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='signatories', to='api.proposal')),
            ],
        ),
        migrations.CreateModel(
            name='StudentEvaluator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('student_id', models.CharField(default='000000', max_length=50)),
                ('email', models.EmailField(default='student@example.com', max_length=254)),
                ('contact_number', models.CharField(default='0000000000', max_length=15)),
                ('course', models.CharField(default='Unknown Course', max_length=255)),
                ('department', models.CharField(default='Unknown Department', max_length=255)),
                ('evaluator', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.evaluatoraccount')),
            ],
        ),
        migrations.CreateModel(
            name='BarangayApproval',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('barangay_name', models.CharField(default='Unknown Barangay', max_length=255)),
                ('status', models.CharField(choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected')], default='Pending', max_length=20)),
                ('sign_date', models.DateField(blank=True, default=None, null=True)),
                ('remarks', models.TextField(blank=True, default='No Remarks', null=True)),
                ('proposal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='barangay_approvals', to='api.proposal')),
            ],
            options={
                'unique_together': {('proposal', 'barangay_name')},
            },
        ),
    ]

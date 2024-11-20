from django.core.management.base import BaseCommand
from api.models import Department, Account, Proposal, Signatory, ProponentAccount, Barangay
from django.utils import timezone
from datetime import timedelta
from datetime import datetime

class Command(BaseCommand):
    help = 'Seed the database with proposals from provided PDF details, each with unique signatories.'

    def handle(self, *args, **kwargs):
        # Ensure all required departments exist
        self.ensure_departments_exist()

        # Seed the proposals for each department
        self.create_coed_proposal()
        self.create_coe_proposal()
        self.create_cbaa_proposal()
        self.create_ccs_proposal()
        self.create_cas_proposal()
        self.create_chas_proposal()

        self.stdout.write(self.style.SUCCESS("Successfully seeded proposals and related signatories."))

    def ensure_departments_exist(self):
        required_departments = [
            "College of Education",
            "College of Engineering",
            "College of Business, Accountancy, and Administration",
            "College of Computing Studies",
            "College of Health and Allied Sciences",
            "College of Arts and Sciences",
        ]
        for dept_name in required_departments:
            Department.objects.get_or_create(dept_name=dept_name)
        self.stdout.write(self.style.SUCCESS("Ensured all required departments exist."))

    def create_coed_proposal(self):
        department = Department.objects.get(dept_name="College of Education")
        proponent = Account.objects.filter(accountType="Proponent", proponentaccount__department=department).first()

        if not proponent:
            self.stdout.write(self.style.WARNING(f"No proponent found for department: {department.dept_name}. Skipping proposal creation."))
            return
        
        date_range = "May 2023 - June 2026"
        start_date_str, end_date_str = date_range.split(" - ")
        start_date = datetime.strptime(f"{start_date_str} 01", "%B %Y %d").date()
        end_date = datetime.strptime(f"{end_date_str} 01", "%B %Y %d").date()

        proposal = Proposal.objects.create(
            user_id=proponent,
            title='Tulong sa Pagblang. Pagsulat at Pagbasa, Sulong Sala, Covered Period Date of Baclaran, San Isidro, at Bigaa: "Pathways to Lifelong Learning"',
            engagement_date='2023-05-01',
            disengagement_date='2026-06-01',
            department=department.dept_name,
            lead_proponent="Edward Francis G. Gabor",
            contact_details="N/A",
            project_description="""This program activity is anchored on DepEd Memo 62 s of 2022, 2022 Brigada Eskwela Implementing Guidelines. The BE program was institutionalized through the issUance of DO No. 24, S. 2008. The program became a regular yeary undertaking and a permanent part of the school calendar. Through the years, BE ContinuOUsly evolved and purposively respond to the immediate needs of school. This year, the BE program shal define the following component to effectively Support DepEd on its effort to provide quality basic education. The Brigada Pagbasa an after-school reading remediation program in response to the call of the Department to intensify advocacy for reading consistent with DepEd Memorandum No. 173, s. 2019, titled "Hamon: Bawat Bata Burmabasa (3Bs Initiatives)." In the same issuance, DepEd acknowledged that initiatives implemented to develop the leamers' reading skills are insufficient based on the resuits of the national assessments for leamers. The BP Program aims to make every leamer a reader by engaging partners and stakeholders to promote the culture of reading. Specificaly, the "Pathways to Lifelong Leaming" program aims to provide access to basic education and functional literacy to underserved communities through a combination of reading, writing, numeracy, altemative leaming. and occupational iteracy programs. The program seeks to address the lack of access to fomal education and the low levels of literacy and numeracy among disadvantaged groUps such as out-of-school youth and adult learners. """,
            target_date=start_date,
            location="Sala Elementary School, Bigaa Elementary School, Bigaa National Highschool, Diezmo Elementary School, Baclaran Elementary School, San Isidro  School",
            partner_community="Sala, Bigaa, Diezmo, Baclaran, San Isidro",
            school=1,
            barangay=0,
            government_org="N/A",
            non_government_org="N/A",
            identified_needs_text="Reading, Numeracy, Writing, Remedial and Enrichment Classes",
            general_objectives="To promote lifelong leaming and enhance the capacity of leaners to participate fuly in economic, social, and civic life. ",
            specific_objectives="To improve the reading, writing. and numeracy skills of out-of-school youth, adult leamers, and marginalized Communities. ",
            success_indicators='''To improve the reading. witing. and numeracy skils of out-of school youth, adult leamers, and marginalized communities. 
	-There will be 20-30 participants who complete the program with improved literacy skills. 
	-There will be 90% increase in literacy skills of participants before and after the program. ''',
            cooperating_agencies='''DepEd-Cabuyao City and Brgy. Sala, Brgy. Diezmo, Brgy. San Isidro, Brgy. Baclaran, Brgy. Bigaa 
	
	The College of Education will engage into partnership with DepEd Cabuyao City, Brgy. Sala, Brgy. Diezmo. Brgy. Son Isidro, Brgy. Baclaran, Brgy. Bigag through MOA. The MOA will serve as basis for the 3 year conduct of this program. Though collaboration and constant monitoring of the program implementation, it is expected that the needs of the community shall be addressed. ''',
            monitoring_mechanics='''-Tracking of participants' completion rates and progress in the program. 
-Regular assessments of participants' literacy skills before and after the program 
-Regular feedback and evaluation from participants. trainers, and stakeholders to improve the program 
-Monitoring the progress of participants in accessing further education or employment after completing the program 
-Regular monitoring of participants who start their own business to ensure sustainability and success.''',
            evaluation_mechanics="""-Tracking of participants' completion rates and progress in the program. 
-Regular assessments of participants'literacy skills before and after the program 
-Regular feedback and evaluation from participants. trainers, and stakeholders to improve the program 
-Monitoring the progress of participants in accessing further education or employment after completing the program 
-Regular monitoring of paticipants who stat their own business to ensure sustainability and success. """,
            timetable="",
            risk_assessment="",
            action_plans="Develop engaging learning activities, secure funding...",
            sustainability_approaches="Strengthen partnerships and train local educators...",
            budget_requirement_text="PHP 50,000 annually, covering educational materials...",
            budget_requirement_file=None,  # Set to None or a valid file if applicable
            directorSignDate=timezone.now().date(),
            VPRESignDate=timezone.now().date(),
            PRESignDate=None,  # If PRESignDate is optional
            is_three_year_plan=False,
            is_one_year_plan=True,
            current_version_id=None,  # Set to None or appropriate version ID
            remarks=None,  # Set to None or remarks if needed
            status="Approved by Director"
        )

        # Add unique signatories
        Signatory.objects.create(proposal=proposal, name="Edward Francis G. Gabor", position="Proponent / Coordinator", section="prepared")
        Signatory.objects.create(proposal=proposal, name="DR. EMIROSE B. GOKZALES", position="Dean", section="endorsed")
        Signatory.objects.create(proposal=proposal, name="Hon. Francisco Alimagno", position="Brgy. Captain", section="concurred")

        
    # def create_coe_proposal(self):
    #     department = Department.objects.get(dept_name="College of Engineering")
    #     proponent = Account.objects.filter(accountType="Proponent", proponentaccount__department=department).first()
    #     proposal = Proposal.objects.create(
    #         user_id=proponent,
    #         title="Green Community Initiative: Empowering Sustainable Living",
    #         engagement_date=timezone.now().date() - timedelta(days=10),
    #         disengagement_date=timezone.now().date() + timedelta(days=30),
    #         department=department.dept_name,
    #         lead_proponent="Evelyn De Castro",
    #         contact_details="contact@example.com",
    #          project_description="""
    #             The Green Community Initiative is a sustainable development program designed to educate and empower communities on
    #             clean energy practices, waste management, and environmental conservation. Through workshops and training sessions,
    #             participants will learn about renewable energy solutions, efficient waste segregation, and the impact of sustainable
    #             living on the environment. The program aims to reduce the community's carbon footprint and promote long-term ecological awareness.
    #         """,
    #         target_date=timezone.now().date() + timedelta(days=30),
    #         location="Baclaran, Diezmo, Sala, Bigaa, San Isidro",
    #         partner_community="Baclaran, Diezmo, Sala, Bigaa, San Isidro",
    #         school=False,
    #         barangay=True,
    #         government_org="City Hall",
    #         non_government_org="Local NGOs",
    #         identified_needs_text="Urgent need for effective waste management and education on clean energy practices.",
    #         general_objectives="To promote sustainable living and environmental conservation.",
    #         specific_objectives="Educate communities on renewable energy and waste reduction techniques.",
    #         success_indicators="Achieve a 50 percent reduction in waste and increased community engagement in environmental practices.",
    #         cooperating_agencies="Engineering associations, local environmental groups, and government agencies.",
    #         monitoring_mechanics="Bi-annual reviews and ongoing impact assessments to measure community progress.",
    #         evaluation_mechanics="""
    #             - Surveys to assess community awareness before and after the program.
    #             - Analysis of waste reduction data collected from participating households.
    #             - Feedback sessions with community leaders to evaluate program effectiveness.
    #         """,
    #         timetable="Quarterly workshops and regular community engagement activities.",
    #         risk_assessment="Community resistance to change and logistical challenges in remote areas.",
    #         action_plans="Conduct awareness campaigns and establish community-based support groups.",
    #         sustainability_approaches="Develop partnerships with local businesses and train community leaders on sustainable practices.",
    #         budget_requirement_text="PHP 100,000 per year for training materials, equipment, and community events.",
    #         directorSignDate=timezone.now().date(),
    #         VPRESignDate=timezone.now().date(),
    #         PRESignDate=None,
    #         is_three_year_plan=True,
    #         is_one_year_plan=False,
    #         status="Approved by Director"
    #     )
    #     # Unique Signatories for COE
    #     Signatory.objects.create(proposal=proposal, name="Engr. Evelyn L. De Castro", position="Proponent / Coordinator", section="prepared")
    #     Signatory.objects.create(proposal=proposal, name="Dr. Luisito Lolong Lacatan", position="Director/Dean/Principal ", section="endorsed")
    #     Signatory.objects.create(proposal=proposal, name="Hon. Francisco Alimagno", position="Brgy. Captain", section="concurred")

    # def create_cbaa_proposal(self):
    #     department = Department.objects.get(dept_name="College of Business, Accountancy, and Administration")
    #     proponent = Account.objects.filter(accountType="Proponent", proponentaccount__department=department).first()
        
    #     if not proponent:
    #         # Log and skip if no proponent exists for this department
    #         self.stdout.write(self.style.WARNING(f"No proponent found for department: {department.dept_name}. Skipping proposal creation."))
    #         return
        
    #     proposal = Proposal.objects.create(
    #         user_id=proponent,
    #         title="KARUNUNGAN, KABUHAYAN, KAUNLARAN (KKK): Financial Literacy and Livelihood Program",
    #         engagement_date=timezone.now().date() - timedelta(days=10),
    #         disengagement_date=timezone.now().date() + timedelta(days=30),
    #         department=department.dept_name,
    #         lead_proponent="Flordeliza S. Em",
    #         contact_details="contact@example.com",
    #         project_description="""
    #             The KKK program is a comprehensive financial literacy and livelihood training initiative aimed at empowering solo parents
    #             and unemployed youth. The program covers essential topics such as budgeting, savings, entrepreneurship, and sustainable
    #             income-generating activities. Participants will be equipped with the skills needed to manage their finances effectively
    #             and start small businesses, contributing to economic growth and stability in their communities.
    #         """,
    #         target_date=timezone.now().date() + timedelta(days=30),
    #         location="Sala, Baclaran, San Isidro, Diezmo, Bigaa",
    #         partner_community="Sala, Baclaran, San Isidro, Diezmo, Bigaa",
    #         school=False,
    #         barangay=True,
    #         government_org="TESDA",
    #         non_government_org="Local Cooperatives",
    #         identified_needs_text="Addressing financial instability and lack of entrepreneurial skills.",
    #         general_objectives="To enhance financial literacy and promote livelihood opportunities.",
    #         specific_objectives="Teach effective budget management and entrepreneurship skills.",
    #         success_indicators="30% increase in participants' income and successful establishment of small enterprises.",
    #         cooperating_agencies="TESDA, local cooperatives, and business mentors.",
    #         monitoring_mechanics="Quarterly financial assessments and ongoing mentorship for participants.",
    #         evaluation_mechanics="""
    #             - Financial assessments before and after training sessions.
    #             - Participant feedback to assess the relevance and impact of training modules.
    #             - Analysis of income growth and business establishment statistics.
    #         """,
    #         timetable="Monthly seminars and continuous support sessions.",
    #         risk_assessment="Potential low participation and limited access to capital.",
    #         action_plans="Provide attendance incentives and establish microfinancing options.",
    #         sustainability_approaches="Support through microfinance and local business networks.",
    #         budget_requirement_text="PHP 200,000 annually for training, materials, and microfinance initiatives.",
    #         directorSignDate=timezone.now().date(),
    #         VPRESignDate=timezone.now().date(),
    #         PRESignDate=None,
    #         is_three_year_plan=False,
    #         is_one_year_plan=True,
    #         status="Pending"
    #     )
    #     # Unique Signatories for CBAA
    #     Signatory.objects.create(proposal=proposal, name="Flordeliza S. Em, MBA", position="Proponent / CES Coordinator", section="prepared")
    #     Signatory.objects.create(proposal=proposal, name="Dr. Fernando T. Pendon III", position="Head of Cooperative Development", section="endorsed")
    #     Signatory.objects.create(proposal=proposal, name="Hon. Francisco Alimagno", position="Brgy. Captain", section="concurred")

    # def create_ccs_proposal(self):
    #     department = Department.objects.get(dept_name="College of Computing Studies")
    #     proponent = Account.objects.filter(accountType="Proponent", proponentaccount__department=department).first()
    #     proposal = Proposal.objects.create(
    #         user_id=proponent,
    #         title="Cabuyeno's Computer Literacy Program (CCLIP)",
    #         engagement_date=timezone.now().date() - timedelta(days=10),
    #         disengagement_date=timezone.now().date() + timedelta(days=30),
    #         department=department.dept_name,
    #         lead_proponent="Patrick Arcelito Ogalesco",
    #         contact_details="contact@example.com",
    #         project_description="""
    #             The CCLIP initiative is a digital literacy program aimed at bridging the digital divide in the community. The program
    #             offers training in basic computer skills, the use of office applications, and graphic design. Special sessions will
    #             focus on internet safety and responsible online behavior. By equipping participants with essential digital skills,
    #             CCLIP seeks to enhance employability and promote economic opportunities.
    #         """,
    #         target_date=timezone.now().date() + timedelta(days=30),
    #         location="San Isidro, Sala, Bigaa, Baclaran, Diezmo",
    #         partner_community="San Isidro, Sala, Bigaa, Baclaran, Diezmo",
    #         school=True,
    #         barangay=False,
    #         government_org="DICT",
    #         non_government_org="None",
    #         identified_needs_text="High rates of digital illiteracy and limited access to technology.",
    #         general_objectives="To increase computer literacy and digital proficiency among community members.",
    #         specific_objectives="Teach practical computer skills and promote safe internet use.",
    #         success_indicators="80% of participants achieving proficiency in basic computer operations.",
    #         cooperating_agencies="DICT and community-based NGOs.",
    #         monitoring_mechanics="Pre- and post-training assessments and regular skill evaluations.",
    #         evaluation_mechanics="""
    #             - Assessments of digital literacy skills before and after the program.
    #             - Participant surveys to evaluate program content and delivery.
    #             - Long-term tracking of employment outcomes for participants.
    #         """,
    #         timetable="Bi-weekly classes and hands-on training sessions.",
    #         risk_assessment="Limited access to technology and lack of motivation.",
    #         action_plans="Provide access to laptops and create engaging, hands-on learning modules.",
    #         sustainability_approaches="Collaboration with tech companies for device donations and ongoing support.",
    #         budget_requirement_text="PHP 150,000 annually for equipment, training materials, and internet access.",
    #         directorSignDate=timezone.now().date(),
    #         VPRESignDate=timezone.now().date(),
    #         PRESignDate=None,
    #         is_three_year_plan=True,
    #         is_one_year_plan=False,
    #         status="Approved by Director"
    #     )
    #     # Unique Signatories for CCS
    #     Signatory.objects.create(proposal=proposal, name="Ms. Rabino, Nuela Jane", position="Proponent / CES Coordinator", section="prepared")
    #     Signatory.objects.create(proposal=proposal, name="Dr. Alice Lacorte", position="Director/Dean/Pricipal", section="endorsed")
    #     Signatory.objects.create(proposal=proposal, name="Hon. Francisco Alimagno", position="Brgy. Captain", section="concurred")

    # def create_chas_proposal(self):
    #     department = Department.objects.get(dept_name='College of Health and Allied Sciences')
    #     proponent = Account.objects.filter(accountType="Proponent", proponentaccount__department=department).first()
    #     proposal = Proposal.objects.create(
    #         user_id=proponent,
    #         title="Healthy Community, Healthy Families: Health and Wellness Education",
    #         engagement_date=timezone.now().date() - timedelta(days=10),
    #         disengagement_date=timezone.now().date() + timedelta(days=30),
    #         department=department.dept_name,
    #         lead_proponent="Dr. Jinky C. Malabanan",
    #         contact_details="contact@example.com",
    #         project_description="""
    #             The Healthy Community, Healthy Families initiative aims to improve overall community health through education on
    #             preventive care, nutrition, and wellness. The program will deliver workshops and training sessions focusing on
    #             healthy lifestyle choices, disease prevention, and the importance of mental health. By promoting wellness and
    #             providing access to health resources, the project seeks to reduce the prevalence of preventable illnesses and
    #             empower families to make informed health decisions.
    #         """,
    #         target_date=timezone.now().date() + timedelta(days=30),
    #         location="Sala, Bigaa, Baclaran, San Isidro, Diezmo",
    #         partner_community="Sala, Bigaa, Baclaran, San Isidro, Diezmo",
    #         school=False,
    #         barangay=True,
    #         government_org="DOH",
    #         non_government_org="Health NGOs",
    #         identified_needs_text="Lack of health awareness and preventive care in the community.",
    #         general_objectives="To promote health and wellness education for a healthier community.",
    #         specific_objectives="Educate families on preventive health measures and proper nutrition.",
    #         success_indicators="Reduced incidence of preventable diseases and increased health literacy.",
    #         cooperating_agencies="DOH, local hospitals, and health-focused NGOs.",
    #         monitoring_mechanics="Annual health surveys and participant feedback.",
    #         evaluation_mechanics="""
    #             - Health screenings before and after workshops to assess health improvements.
    #             - Surveys to evaluate participant understanding and behavior changes.
    #             - Community feedback to assess the program's impact and areas for improvement.
    #         """,
    #         timetable="Quarterly workshops and regular health check-ups.",
    #         risk_assessment="Low community engagement and resistance to change.",
    #         action_plans="Organize health fairs and provide free health screenings.",
    #         sustainability_approaches="Train local health workers and establish long-term community health programs.",
    #         budget_requirement_text="PHP 300,000 annually for educational materials, health screenings, and outreach events.",
    #         directorSignDate=timezone.now().date(),
    #         VPRESignDate=timezone.now().date(),
    #         PRESignDate=None,
    #         is_three_year_plan=True,
    #         is_one_year_plan=False,
    #         status="Approved by Director"
    #     )
    #     # Unique Signatories for CHAS/CAS
    #     Signatory.objects.create(proposal=proposal, name="ISBELITA N. Isip MAN RN", position="Proponent / CES Coordinator ", section="prepared")
    #     Signatory.objects.create(proposal=proposal, name="DR. JINKY C. MALABANAN", position="Dean", section="endorsed")
    #     Signatory.objects.create(proposal=proposal, name="Hon. Francisco Alimagno", position="Brgy. Captain", section="concurred")
        
    # def create_cas_proposal(self):
    #     department = Department.objects.get(dept_name='College of Arts and Sciences')
    #     proponent = Account.objects.filter(accountType="Proponent", proponentaccount__department=department).first()
    #     proposal = Proposal.objects.create(
    #         user_id=proponent,
    #         title="Healthy Community, Healthy Families: Health and Wellness Education",
    #         engagement_date=timezone.now().date() - timedelta(days=10),
    #         disengagement_date=timezone.now().date() + timedelta(days=30),
    #         department=department.dept_name,
    #         lead_proponent="Dr. Jinky C. Malabanan",
    #         contact_details="contact@example.com",
    #         project_description="""
    #             The Healthy Community, Healthy Families initiative aims to improve overall community health through education on
    #             preventive care, nutrition, and wellness. The program will deliver workshops and training sessions focusing on
    #             healthy lifestyle choices, disease prevention, and the importance of mental health. By promoting wellness and
    #             providing access to health resources, the project seeks to reduce the prevalence of preventable illnesses and
    #             empower families to make informed health decisions.
    #         """,
    #         target_date=timezone.now().date() + timedelta(days=30),
    #         location="Sala, Bigaa, Baclaran, San Isidro, Diezmo",
    #         partner_community="Sala, Bigaa, Baclaran, San Isidro, Diezmo",
    #         school=False,
    #         barangay=True,
    #         government_org="DOH",
    #         non_government_org="Health NGOs",
    #         identified_needs_text="Lack of health awareness and preventive care in the community.",
    #         general_objectives="To promote health and wellness education for a healthier community.",
    #         specific_objectives="Educate families on preventive health measures and proper nutrition.",
    #         success_indicators="Reduced incidence of preventable diseases and increased health literacy.",
    #         cooperating_agencies="DOH, local hospitals, and health-focused NGOs.",
    #         monitoring_mechanics="Annual health surveys and participant feedback.",
    #         evaluation_mechanics="""
    #             - Health screenings before and after workshops to assess health improvements.
    #             - Surveys to evaluate participant understanding and behavior changes.
    #             - Community feedback to assess the program's impact and areas for improvement.
    #         """,
    #         timetable="Quarterly workshops and regular health check-ups.",
    #         risk_assessment="Low community engagement and resistance to change.",
    #         action_plans="Organize health fairs and provide free health screenings.",
    #         sustainability_approaches="Train local health workers and establish long-term community health programs.",
    #         budget_requirement_text="PHP 300,000 annually for educational materials, health screenings, and outreach events.",
    #         directorSignDate=timezone.now().date(),
    #         VPRESignDate=timezone.now().date(),
    #         PRESignDate=None,
    #         is_three_year_plan=True,
    #         is_one_year_plan=False,
    #         status="Approved by Director"
    #     )
    #     # Unique Signatories for CHAS/CAS
    #     Signatory.objects.create(proposal=proposal, name="ISBELITA N. Isip MAN RN", position="Proponent / CES Coordinator ", section="prepared")
    #     Signatory.objects.create(proposal=proposal, name="DR. JINKY C. MALABANAN", position="Dean", section="endorsed")
    #     Signatory.objects.create(proposal=proposal, name="Hon. Francisco Alimagno", position="Brgy. Captain", section="concurred")

        
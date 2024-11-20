from django.core.management.base import BaseCommand
from api.models import Department, Account, Proposal, Signatory, ProponentAccount, Barangay
from django.utils import timezone
from datetime import timedelta

class Command(BaseCommand):
    help = 'Seed the database with proposals from provided PDF details, each with unique signatories.'

    def handle(self, *args, **kwargs):
        # Seed the proposals for each department
        self.create_coed_proposal()
        self.create_coe_proposal()
        self.create_cbaa_proposal()
        self.create_ccs_proposal()
        self.create_cas_proposal()
        self.create_chas_proposal()

        self.stdout.write(self.style.SUCCESS('Successfully seeded proposals and related signatories.'))
        
        
        
    def create_coed_proposal(self):
        department = Department.objects.get(dept_name="College of Education")
        proponent = Account.objects.filter(accountType="Proponent", proponentaccount__department=department).first()
        proposal = Proposal.objects.create(
            user_id=proponent,
            title="Tulong sa Pagbasa, Sulong Sala, Baclaran, San Isidro, at Bigaa: Pathways to Lifelong Learning",
            engagement_date=timezone.now().date() - timedelta(days=10),
            disengagement_date=timezone.now().date() + timedelta(days=30),
            department=department.dept_name,
            lead_proponent="Edward Francis G. Gabor",
            contact_details="contact@example.com",
            project_description="""
                This comprehensive literacy and educational improvement project aims to address the low literacy and numeracy rates among
                underserved and marginalized communities. Anchored on the principles outlined in DepEd Memorandum No. 62, s. 2022, and
                DepEd Memorandum No. 173, s. 2019, the project seeks to provide a holistic approach to lifelong learning through a series
                of targeted reading, writing, and numeracy programs. The project will engage multiple stakeholders, including local schools,
                NGOs, and government agencies, to foster a community-driven initiative that empowers learners and promotes sustained educational growth.
            """,
            target_date=timezone.now().date() + timedelta(days=30),
            location="Sala, Bigaa, Diezmo, Baclaran, San Isidro",
            partner_community="Sala, Bigaa, Diezmo, Baclaran, San Isidro",
            school=True,
            barangay=False,
            government_org="DepEd",
            non_government_org="None",
            identified_needs_text="""
                The identified needs include insufficient literacy and numeracy skills, lack of access to quality education for
                out-of-school youth, and limited resources for remedial and enrichment classes. There is also a need to provide
                continuous support and resources to improve overall educational outcomes for the target communities.
            """,
            general_objectives="To promote lifelong learning and enhance the capacity of learners to fully participate in economic, social, and civic life.",
            specific_objectives="""
                - Enhance reading, writing, and numeracy skills of out-of-school youth and adult learners.
                - Provide accessible and inclusive education programs tailored to the needs of marginalized communities.
                - Foster a culture of learning and educational engagement through community-driven initiatives.
            """,
            success_indicators="""
                - A minimum of 20-30 participants completing the program with demonstrable improvement in literacy skills.
                - At least a 90 percent increase in literacy and numeracy proficiency among participants, as measured by pre- and post-assessments.
                - Positive feedback from participants and community stakeholders, indicating program effectiveness.
            """,
            cooperating_agencies="Local schools, NGOs, and DepEd-Cabuyao City",
            monitoring_mechanics="Monthly assessments to track participant progress and regular feedback sessions with trainers and community partners.",
            evaluation_mechanics="""
                - Pre- and post-program literacy assessments to measure improvements.
                - Surveys and interviews with participants to gather qualitative feedback.
                - Regular review meetings with program facilitators to evaluate effectiveness and make adjustments.
                """,
            timetable="Year-long literacy and numeracy programs with bi-weekly sessions.",
            risk_assessment="Potential lack of interest and motivation from target beneficiaries, limited resources, and logistical challenges.",
            action_plans="Develop engaging learning activities, secure funding, and implement community outreach strategies.",
            sustainability_approaches="Strengthen partnerships and train local educators for long-term impact.",
            budget_requirement_text="PHP 50,000 annually, covering educational materials, training resources, and community events.",
            directorSignDate=timezone.now().date(),
            VPRESignDate=timezone.now().date(),
            PRESignDate=None,
            is_three_year_plan=False,
            is_one_year_plan=True,
            status="Approved by Director"
        )
        # Unique Signatories for COED
        Signatory.objects.create(proposal=proposal, name="Edward Francis G. Gabor", position="Proponent / Coordinator", section="prepared")
        Signatory.objects.create(proposal=proposal, name="DR. EMIROSE B. GOKZALES", position="Dean", section="endorsed")
        Signatory.objects.create(proposal=proposal, name="Hon. Francisco Alimagno", position="Brgy. Captain", section="concurred")
        
    def create_coe_proposal(self):
        department = Department.objects.get(dept_name="College of Engineering")
        proponent = Account.objects.filter(accountType="Proponent", proponentaccount__department=department).first()
        proposal = Proposal.objects.create(
            user_id=proponent,
            title="Green Community Initiative: Empowering Sustainable Living",
            engagement_date=timezone.now().date() - timedelta(days=10),
            disengagement_date=timezone.now().date() + timedelta(days=30),
            department=department.dept_name,
            lead_proponent="Evelyn De Castro",
            contact_details="contact@example.com",
             project_description="""
                The Green Community Initiative is a sustainable development program designed to educate and empower communities on
                clean energy practices, waste management, and environmental conservation. Through workshops and training sessions,
                participants will learn about renewable energy solutions, efficient waste segregation, and the impact of sustainable
                living on the environment. The program aims to reduce the community's carbon footprint and promote long-term ecological awareness.
            """,
            target_date=timezone.now().date() + timedelta(days=30),
            location="Baclaran, Diezmo, Sala, Bigaa, San Isidro",
            partner_community="Baclaran, Diezmo, Sala, Bigaa, San Isidro",
            school=False,
            barangay=True,
            government_org="City Hall",
            non_government_org="Local NGOs",
            identified_needs_text="Urgent need for effective waste management and education on clean energy practices.",
            general_objectives="To promote sustainable living and environmental conservation.",
            specific_objectives="Educate communities on renewable energy and waste reduction techniques.",
            success_indicators="Achieve a 50 percent reduction in waste and increased community engagement in environmental practices.",
            cooperating_agencies="Engineering associations, local environmental groups, and government agencies.",
            monitoring_mechanics="Bi-annual reviews and ongoing impact assessments to measure community progress.",
            evaluation_mechanics="""
                - Surveys to assess community awareness before and after the program.
                - Analysis of waste reduction data collected from participating households.
                - Feedback sessions with community leaders to evaluate program effectiveness.
            """,
            timetable="Quarterly workshops and regular community engagement activities.",
            risk_assessment="Community resistance to change and logistical challenges in remote areas.",
            action_plans="Conduct awareness campaigns and establish community-based support groups.",
            sustainability_approaches="Develop partnerships with local businesses and train community leaders on sustainable practices.",
            budget_requirement_text="PHP 100,000 per year for training materials, equipment, and community events.",
            directorSignDate=timezone.now().date(),
            VPRESignDate=timezone.now().date(),
            PRESignDate=None,
            is_three_year_plan=True,
            is_one_year_plan=False,
            status="Approved by Director"
        )
        # Unique Signatories for COE
        Signatory.objects.create(proposal=proposal, name="Engr. Evelyn L. De Castro", position="Proponent / Coordinator", section="prepared")
        Signatory.objects.create(proposal=proposal, name="Dr. Luisito Lolong Lacatan", position="Director/Dean/Principal ", section="endorsed")
        Signatory.objects.create(proposal=proposal, name="Hon. Francisco Alimagno", position="Brgy. Captain", section="concurred")

    def create_cbaa_proposal(self):
        department = Department.objects.get(dept_name="College of Business, Accountancy, and Administration")
        proponent = Account.objects.filter(accountType="Proponent", proponentaccount__department=department).first()
        proposal = Proposal.objects.create(
            user_id=proponent,
            title="KARUNUNGAN, KABUHAYAN, KAUNLARAN (KKK): Financial Literacy and Livelihood Program",
            engagement_date=timezone.now().date() - timedelta(days=10),
            disengagement_date=timezone.now().date() + timedelta(days=30),
            department=department.dept_name,
            lead_proponent="Flordeliza S. Em",
            contact_details="contact@example.com",
            project_description="""
                The KKK program is a comprehensive financial literacy and livelihood training initiative aimed at empowering solo parents
                and unemployed youth. The program covers essential topics such as budgeting, savings, entrepreneurship, and sustainable
                income-generating activities. Participants will be equipped with the skills needed to manage their finances effectively
                and start small businesses, contributing to economic growth and stability in their communities.
            """,
            target_date=timezone.now().date() + timedelta(days=30),
            location="Sala, Baclaran, San Isidro, Diezmo, Bigaa",
            partner_community="Sala, Baclaran, San Isidro, Diezmo, Bigaa",
            school=False,
            barangay=True,
            government_org="TESDA",
            non_government_org="Local Cooperatives",
            identified_needs_text="Addressing financial instability and lack of entrepreneurial skills.",
            general_objectives="To enhance financial literacy and promote livelihood opportunities.",
            specific_objectives="Teach effective budget management and entrepreneurship skills.",
            success_indicators="30% increase in participants' income and successful establishment of small enterprises.",
            cooperating_agencies="TESDA, local cooperatives, and business mentors.",
            monitoring_mechanics="Quarterly financial assessments and ongoing mentorship for participants.",
            evaluation_mechanics="""
                - Financial assessments before and after training sessions.
                - Participant feedback to assess the relevance and impact of training modules.
                - Analysis of income growth and business establishment statistics.
            """,
            timetable="Monthly seminars and continuous support sessions.",
            risk_assessment="Potential low participation and limited access to capital.",
            action_plans="Provide attendance incentives and establish microfinancing options.",
            sustainability_approaches="Support through microfinance and local business networks.",
            budget_requirement_text="PHP 200,000 annually for training, materials, and microfinance initiatives.",
            directorSignDate=timezone.now().date(),
            VPRESignDate=timezone.now().date(),
            PRESignDate=None,
            is_three_year_plan=False,
            is_one_year_plan=True,
            status="Pending"
        )
        # Unique Signatories for CBAA
        Signatory.objects.create(proposal=proposal, name="Flordeliza S. Em, MBA", position="Proponent / CES Coordinator", section="prepared")
        Signatory.objects.create(proposal=proposal, name="Dr. Fernando T. Pendon III", position="Head of Cooperative Development", section="endorsed")
        Signatory.objects.create(proposal=proposal, name="Hon. Francisco Alimagno", position="Brgy. Captain", section="concurred")

    def create_ccs_proposal(self):
        department = Department.objects.get(dept_name="College of Computing Studies")
        proponent = Account.objects.filter(accountType="Proponent", proponentaccount__department=department).first()
        proposal = Proposal.objects.create(
            user_id=proponent,
            title="Cabuyeno's Computer Literacy Program (CCLIP)",
            engagement_date=timezone.now().date() - timedelta(days=10),
            disengagement_date=timezone.now().date() + timedelta(days=30),
            department=department.dept_name,
            lead_proponent="Patrick Arcelito Ogalesco",
            contact_details="contact@example.com",
            project_description="""
                The CCLIP initiative is a digital literacy program aimed at bridging the digital divide in the community. The program
                offers training in basic computer skills, the use of office applications, and graphic design. Special sessions will
                focus on internet safety and responsible online behavior. By equipping participants with essential digital skills,
                CCLIP seeks to enhance employability and promote economic opportunities.
            """,
            target_date=timezone.now().date() + timedelta(days=30),
            location="San Isidro, Sala, Bigaa, Baclaran, Diezmo",
            partner_community="San Isidro, Sala, Bigaa, Baclaran, Diezmo",
            school=True,
            barangay=False,
            government_org="DICT",
            non_government_org="None",
            identified_needs_text="High rates of digital illiteracy and limited access to technology.",
            general_objectives="To increase computer literacy and digital proficiency among community members.",
            specific_objectives="Teach practical computer skills and promote safe internet use.",
            success_indicators="80% of participants achieving proficiency in basic computer operations.",
            cooperating_agencies="DICT and community-based NGOs.",
            monitoring_mechanics="Pre- and post-training assessments and regular skill evaluations.",
            evaluation_mechanics="""
                - Assessments of digital literacy skills before and after the program.
                - Participant surveys to evaluate program content and delivery.
                - Long-term tracking of employment outcomes for participants.
            """,
            timetable="Bi-weekly classes and hands-on training sessions.",
            risk_assessment="Limited access to technology and lack of motivation.",
            action_plans="Provide access to laptops and create engaging, hands-on learning modules.",
            sustainability_approaches="Collaboration with tech companies for device donations and ongoing support.",
            budget_requirement_text="PHP 150,000 annually for equipment, training materials, and internet access.",
            directorSignDate=timezone.now().date(),
            directorSignDate=timezone.now().date(),
            VPRESignDate=timezone.now().date(),
            PRESignDate=None,
            is_three_year_plan=True,
            is_one_year_plan=False,
            status="Approved by Director"
        )
        # Unique Signatories for CCS
        Signatory.objects.create(proposal=proposal, name="Ms. Rabino, Nuela Jane", position="Proponent / CES Coordinator", section="prepared")
        Signatory.objects.create(proposal=proposal, name="Dr. Alice Lacorte", position="Director/Dean/Pricipal", section="endorsed")
        Signatory.objects.create(proposal=proposal, name="Hon. Francisco Alimagno", position="Brgy. Captain", section="concurred")

    def create_chas_proposal(self):
        department = Department.objects.get(dept_name='College of Health and Allied Sciences')
        proponent = Account.objects.filter(accountType="Proponent", proponentaccount__department=department).first()
        proposal = Proposal.objects.create(
            user_id=proponent,
            title="Healthy Community, Healthy Families: Health and Wellness Education",
            engagement_date=timezone.now().date() - timedelta(days=10),
            disengagement_date=timezone.now().date() + timedelta(days=30),
            department=department.dept_name,
            lead_proponent="Dr. Jinky C. Malabanan",
            contact_details="contact@example.com",
            project_description="""
                The Healthy Community, Healthy Families initiative aims to improve overall community health through education on
                preventive care, nutrition, and wellness. The program will deliver workshops and training sessions focusing on
                healthy lifestyle choices, disease prevention, and the importance of mental health. By promoting wellness and
                providing access to health resources, the project seeks to reduce the prevalence of preventable illnesses and
                empower families to make informed health decisions.
            """,
            target_date=timezone.now().date() + timedelta(days=30),
            location="Sala, Bigaa, Baclaran, San Isidro, Diezmo",
            partner_community="Sala, Bigaa, Baclaran, San Isidro, Diezmo",
            school=False,
            barangay=True,
            government_org="DOH",
            non_government_org="Health NGOs",
            identified_needs_text="Lack of health awareness and preventive care in the community.",
            general_objectives="To promote health and wellness education for a healthier community.",
            specific_objectives="Educate families on preventive health measures and proper nutrition.",
            success_indicators="Reduced incidence of preventable diseases and increased health literacy.",
            cooperating_agencies="DOH, local hospitals, and health-focused NGOs.",
            monitoring_mechanics="Annual health surveys and participant feedback.",
            evaluation_mechanics="""
                - Health screenings before and after workshops to assess health improvements.
                - Surveys to evaluate participant understanding and behavior changes.
                - Community feedback to assess the program's impact and areas for improvement.
            """,
            timetable="Quarterly workshops and regular health check-ups.",
            risk_assessment="Low community engagement and resistance to change.",
            action_plans="Organize health fairs and provide free health screenings.",
            sustainability_approaches="Train local health workers and establish long-term community health programs.",
            budget_requirement_text="PHP 300,000 annually for educational materials, health screenings, and outreach events.",
            directorSignDate=timezone.now().date(),
            VPRESignDate=timezone.now().date(),
            PRESignDate=None,
            is_three_year_plan=True,
            is_one_year_plan=False,
            status="Approved by Director"
        )
        # Unique Signatories for CHAS/CAS
        Signatory.objects.create(proposal=proposal, name="ISBELITA N. Isip MAN RN", position="Proponent / CES Coordinator ", section="prepared")
        Signatory.objects.create(proposal=proposal, name="DR. JINKY C. MALABANAN", position="Dean", section="endorsed")
        Signatory.objects.create(proposal=proposal, name="Hon. Francisco Alimagno", position="Brgy. Captain", section="concurred")
        
    def create_cas_proposal(self):
        department = Department.objects.get(dept_name='College of Arts and Sciences')
        proponent = Account.objects.filter(accountType="Proponent", proponentaccount__department=department).first()
        proposal = Proposal.objects.create(
            user_id=proponent,
            title="Healthy Community, Healthy Families: Health and Wellness Education",
            engagement_date=timezone.now().date() - timedelta(days=10),
            disengagement_date=timezone.now().date() + timedelta(days=30),
            department=department.dept_name,
            lead_proponent="Dr. Jinky C. Malabanan",
            contact_details="contact@example.com",
            project_description="""
                The Healthy Community, Healthy Families initiative aims to improve overall community health through education on
                preventive care, nutrition, and wellness. The program will deliver workshops and training sessions focusing on
                healthy lifestyle choices, disease prevention, and the importance of mental health. By promoting wellness and
                providing access to health resources, the project seeks to reduce the prevalence of preventable illnesses and
                empower families to make informed health decisions.
            """,
            target_date=timezone.now().date() + timedelta(days=30),
            location="Sala, Bigaa, Baclaran, San Isidro, Diezmo",
            partner_community="Sala, Bigaa, Baclaran, San Isidro, Diezmo",
            school=False,
            barangay=True,
            government_org="DOH",
            non_government_org="Health NGOs",
            identified_needs_text="Lack of health awareness and preventive care in the community.",
            general_objectives="To promote health and wellness education for a healthier community.",
            specific_objectives="Educate families on preventive health measures and proper nutrition.",
            success_indicators="Reduced incidence of preventable diseases and increased health literacy.",
            cooperating_agencies="DOH, local hospitals, and health-focused NGOs.",
            monitoring_mechanics="Annual health surveys and participant feedback.",
            evaluation_mechanics="""
                - Health screenings before and after workshops to assess health improvements.
                - Surveys to evaluate participant understanding and behavior changes.
                - Community feedback to assess the program's impact and areas for improvement.
            """,
            timetable="Quarterly workshops and regular health check-ups.",
            risk_assessment="Low community engagement and resistance to change.",
            action_plans="Organize health fairs and provide free health screenings.",
            sustainability_approaches="Train local health workers and establish long-term community health programs.",
            budget_requirement_text="PHP 300,000 annually for educational materials, health screenings, and outreach events.",
            directorSignDate=timezone.now().date(),
            VPRESignDate=timezone.now().date(),
            PRESignDate=None,
            is_three_year_plan=True,
            is_one_year_plan=False,
            status="Approved by Director"
        )
        # Unique Signatories for CHAS/CAS
        Signatory.objects.create(proposal=proposal, name="ISBELITA N. Isip MAN RN", position="Proponent / CES Coordinator ", section="prepared")
        Signatory.objects.create(proposal=proposal, name="DR. JINKY C. MALABANAN", position="Dean", section="endorsed")
        Signatory.objects.create(proposal=proposal, name="Hon. Francisco Alimagno", position="Brgy. Captain", section="concurred")

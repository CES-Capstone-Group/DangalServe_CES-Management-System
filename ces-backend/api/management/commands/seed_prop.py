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
        # self.create_coed_proposal()
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
            department="College of Education",
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
            risk_assessment='''-Lack of interest and motivation from the target beneficiaries 
-Insufficient resources and funding: 
-Limited access to technology 
-High turnover rate of trainers 
-Change of leadership due to forthcoming election''',
            action_plans='''-Lack of interest and motivation from the target beneficiaries: The program can design strategies to increase the engagement and motivation of the learners, such as incorporating fun and interactive leaning activities. providing incentives, and showcasing success stories of program graduates. 
-Insufficient resources and funding: The program can explore partnerships with local government units, NGOs, and private organizations to secure additional funding and resources. The program can also conduct fundraising campaigns and seek donations from individuals or businesses 
-Limited access to technology: The program can explore alternative modes of content delivery, such as offline materials, mobile devices, or community libraries. 
-High turnover rate of trainers: The program can provide incentives and professional development opportunities for its trainers to increase their motivation and job satisfaction. The program can also establish a mentorship program to support new trainers and ensure consistency in the delivery of the program's objectives. 
-Change of leadership due to forthcoming election. Conduct stakeholder engagement and buy-in: Engage the new leadership in the planning and implementation of the project. This can help to build trust and understanding between the project team and the new leadership. ''',
            sustainability_approaches='''-Collaboration with Local Partners: Building partnerships with local schools, organizations, and government agencies can ensure the program's long-term success. These partners can provide support in terms of funding, facilities, and volunteers. as well as help to identify and recruit program participants. 
-Empowering Local Leaders: Empowering local leaders and educators to take ownership of the program and its goals is an effective way to ensure its sustainability. By providing training and resources to localleaders, they can continue lead and expand the program even after external Support is with drawn. 
-Community Engagement: Involving the community in the program's design, implementation, and evaluation can the increase buy-in and ensure the program meets the needs of the community. Regular community feedback and evaluation can help to adjust the program as needed and make it more sustainable in the long term. 
-Building Local Capacity: Investing in the development of local capacity, such as training local teachers and providing resources to local schools, can ensure the program's sustainability. This approach can create a ripple effect, as trained educators and students can continue to improve the quality of education in their communities.''',
            budget_requirement_text='''Expenses 		    - Amount
Administration and overhead - Php 5, 000.00
Transportation 		    - Php 8, 000.00
Snacks 			    - Php 8, 000.00
Evaluation and Monitoring   - Php 3, 000.00
Total 			    - Php 20, 000.00''',
            budget_requirement_file=None,  # Set to None or a valid file if applicable
            directorSignDate='2023-05-01',
            VPRESignDate='2023-05-01',
            PRESignDate='2023-05-01',  # If PRESignDate is optional
            is_three_year_plan=True,
            is_one_year_plan=False,
            current_version_id=None,  # Set to None or appropriate version ID
            remarks=None,  # Set to None or remarks if needed
            status="Approved by President"
        )

        # Add unique signatories
        Signatory.objects.create(proposal=proposal, name="Edward Francis G. Gabor", position="Proponent / Coordinator", section="prepared")
        Signatory.objects.create(proposal=proposal, name="DR. EMIROSE B. GOKZALES", position="Dean", section="endorsed")
        Signatory.objects.create(proposal=proposal, name="Hon. Francisco Alimagno", position="Brgy. Captain", section="concurred")
        Signatory.objects.create(proposal=proposal, name="Hon. Nolasco Manimtim", position="Brgy. Captain", section="concurred")
        Signatory.objects.create(proposal=proposal, name="Hon. Richard Algire", position="Brgy. Captain", section="concurred")
        Signatory.objects.create(proposal=proposal, name="Hon. Mauro Galang", position="Brgy. Captain", section="concurred")
        Signatory.objects.create(proposal=proposal, name="Hon. Mario Servo", position="Brgy. Captain", section="concurred")

#----------COE------------#
    def create_coe_proposal(self):
        department = Department.objects.get(dept_name="College of Engineering")
        proponent = Account.objects.filter(accountType="Proponent", proponentaccount__department=department).first()

        if not proponent:
            self.stdout.write(self.style.WARNING(f"No proponent found for department: {department.dept_name}. Skipping proposal creation."))
            return
        
        date_range = "May 2023 - May 2026"
        start_date_str, end_date_str = date_range.split(" - ")
        start_date = datetime.strptime(f"{start_date_str} 01", "%B %Y %d").date()
        end_date = datetime.strptime(f"{end_date_str} 01", "%B %Y %d").date()

        proposal = Proposal.objects.create(
            user_id=proponent,
            title='Green Community Initiative: Empowering Sustainable Living through Energy and Waste Management',
            engagement_date='2023-05-01',
            disengagement_date='2026-05-01',
            department="College of Engineering",
            lead_proponent="Evelyn De Castro, Luisito L Lacatan, Vanessa lci M. Nieva, Ericson A. Mandayo ",
            contact_details="09162346723, 09651605416",
            project_description="""The project is composed of two parts, the first is the "Clean Energy and Environment Literacy Training for Industry and Emerging Technologies" and the 2nd part is the "Brick by Brick: Building Sustainable Communities with Ecobricks." The "Clean Energy and Environment Literacy Training for Industry and Emerging Technologies" is a community-based program designed to educate and empower Cabuyao residents on the benefits of clean and renewable energy, as well as the importance of environmental stewardship. The program is aimed at promoting sustainable practices and reducing the carbon footprint of participating barangays. The program will consist of workshops and training sessions covering topics such as solar and wind energy, energy-efficient building design, Waste reduction and management, and sustainable transportation. Participants will also learn about the economic benefits of adopting clean energy technologies, such as reduced energy costs and increased competitiveness. In addition to the technical training, the program will also provide education on environmental literacy, including the importance of preserving natural resources, reducing pollution, and protecting the planet's biodiversity. Participants learn about the impacts of climate change and how individual and collective action can make a difference. The program will be led by a team of experts in clean energy and environmental science, who will provide hands-on training and support to participants, delivered in a flexible format to accommodate the schedules of busy residents of the target barangays. The "Clean Energy and Environment Literacy Training for Industry and Emerging Technologies" aims to equip participants with the knowledge and skills to positively impact their local communities and the planet by promoting sustainable practices and clean energy technologies, contributing to a healthier and more resilient future for all. Furthermore, ecobricks are plastic bottles filled with non-biodegradable waste materials to create reusable building blocks, turning plastic waste into a useful material for various construction purposes, such as furniture, walls, or even houses. The simple process of making ecobricks can be done by anyone with access to plastic waste and a plastic bottle. Ecobricks reduce plastic waste, preventing it from ending up in landfills, oceans, or other harmful environments, and provide a low-cost, sustainable building material useful in developing countries with limited access to construction resources, making ecobricks a creative solution to the plastic waste problem.""",
            target_date=start_date,
            location="Baclaran, Diezmo, Sala, Bigaa, and San Isidro.",
            partner_community="Baclaran, Bigaa, Diezmo, Sala, San Isidro",
            school=0,
            barangay=0,
            government_org="N/A",
            non_government_org="N/A",
            identified_needs_text="Waste Management, Industry, energy, and emerging technology literacy training, Clean and renewable energy, Environment Education, Development of Information-Education-Communication (IEC) materials on Environment.",
            general_objectives="To establish a community-based program that will empower Cabuyao residents to live sustainably through energy and waste management.",
            specific_objectives="To educate the community on sustainable energy practices, including the use of renewable energy sources such as solar and wind power; to promote waste management practices such as recycling, composting, and reducing plastic waste; to encourage the community to reduce energy consumption by adopting energy-efficient technologies; and to establish a community-based waste management system that is sustainable, efficient, and environmentally friendly. ",
            success_indicators='''Train 500 community members on sustainable energy practices by the end of 2025.
Recycle at least 50% of the community's waste by the end of 2025.
Reduce community energy consumption by 20% by the end of 2025.
Achieve an adoption rate of 80% for the waste management system by the end of 2025.''',
            cooperating_agencies='''The logistical support for the implementation of the planned trainings and seminars will be provided by City Hall and Barangay Hall.
Linkages will be of tremendous help in providing financial sponsorships to accomplish the objectives of the trainings, seminars, and ecobricks production.
The College of Engineering Student organizations will act as a conduit for coordination, information dissemination, and the facilitation of resources.''',
            monitoring_mechanics='''Monitoring the mechanics of the "Green Community Initiative: Empowering Sustainable Living through Energy and Waste Management" project is crucial to ensuring its success and sustainability. Here are some key monitoring mechanics that should be implemented:

            1.Data Collection: A comprehensive data collection system should be established to track the progress of the project. This includes data on energy and waste reduction, community engagement, and other key performance indicators (KPIs) that will be established at the outset of the project.
            2.Regular Reporting: Regular reporting should be conducted to keep stakeholders informed about the progress of the project. Reports should be prepared on a monthly or quarterly basis. 
            3. Performance Evaluation: Performance evaluation should be conducted periodically to assess the effectiveness of the project. This can be done through surveys, focus groups, or other methods that will provide feedback on the project's impact and effectiveness. 
            4. Sustainability Planning: Sustainability planning should be integrated into the project from the outset to ensure its long-term viability. This includes planning for ongoing maintenance and upgrades to energy and waste management systems, as well as continued community engagement and education. 
            By implementing these monitoring mechanics, the "Green Community Initiative: Empowering Sustainable Living through Energy and Waste Management" project can be effectively tracked, evaluated, and adjusted as needed to ensure its success and long-term sustainability.''',
            evaluation_mechanics="""
Evaluation is an essential component of any community-based program, and the "Green Community Initiative: Empowering Sustainable Living through Energy and Waste Management" project is no exception. Here are some key evaluation mechanics that should be implemented: 
1. Establishing Evaluation Criteria: Establishing clear evaluation criteria is crucial to measuring the success of the project. This includes identifying the goals and objectives of the project and developing metrics to measure progress towards achieving those goals. 
2. Data Collection: Data collection should be conducted throughout the project to gather information on key performance indicators, such as energy and waste reduction, community engagement, and participant satisfaction. 
3. Analysis and Interpretation: The data collected should be analyzed and interpreted to evaluate the success of the project. This includes comparing actual outcomes against expected outcomes and assessing the effectiveness of specific project components. 
4. Reporting: Reporting should be conducted periodically to communicate project outcomes to stakeholders. 
5. Continuous Improvement: Based on the findings of the evaluation, continuous improvement should be implemented to address any identified issues and enhance project outcomes. This includes adjusting program components, modifying strategies, and reallocating resources as needed. 
By implementing these evaluation mechanics, the "Green Community Initiative: Empowering Sustainable Living through Energy and Waste Management" project can be effectively evaluated to determine its success and identify opportunities for continuous improvement. This ensures the project remains relevant, effective, and sustainable over the long term.""",
            timetable='''Planning: May - June 2023: 
This phase involves the development of a comprehensive plan for the project. It includes identifying project objectives, defining the scope of the project, selecting the project team, and creating a project timeline and budget.
Awareness and Mobilization: August 2023 - August 2025: This phase involves raising awareness about the project and mobilizing 500 target community members to participate. It includes organizing workshops/trainings and awareness campaigns.
Collection and Processing: Sept. 2024 - August 2025: This phase involves collecting plastic waste from the community and processing it into Ecobricks. Target is at least 50% of the plastic bottle wastes will be recycled. This includes sorting the plastic waste by type, cleaning it, and compacting it into tightly packed Ecobricks.
Construction and Application: Jan 2025 - Dec 2025: This phase involves using the Ecobricks as a sustainable building material for various applications. This phase also involves monitoring the use of the Ecobricks to ensure that they are durable and effective, with the target of 80% adoption by the community. Monitoring on the reduced energy consumption by 20%.
Sustainability Planning: April 2026 - May 2026: Develop a sustainability plan to ensure that the project’s benefits are maintained over the long term. This could include identifying funding sources, establishing partnerships with local businesses and organizations, and ensuring that the community is equipped to continue implementing sustainable living practices after the project is complete.''',
            risk_assessment='''-Resistance to change
-Limited participation
-Technical challenges
-Lack of funding
-Limited resources
-Change of leadership due to forthcoming election
''',
            action_plans='''-Resistance to change: Conduct extensive community outreach and engagement to ensure that residents understand the benefits of sustainable living.
-Limited participation: Provide incentives to those attending.
Technical challenges: The program will partner with technical experts and consultants to provide training and technical assistance to residents.
-Lack of funding: Work closely with local government agencies and other community organizations to secure funding and support.
-Limited resources: The program will rely on community volunteers and establish partnerships with local organizations and businesses to leverage resources and support.
-Change of leadership due to forthcoming election: Conduct stakeholder engagement and buy-in; engage the new leadership in the planning and implementation of the project. This can help to build trust and understanding between the project team and the new leadership.
''',
            sustainability_approaches='''-Capacity Building: Another sustainability approach is to build the capacity of community members to promote sustainable living practices. The program will provide training and technical assistance to residents to help them adopt sustainable energy practices and waste management systems. The program will also establish partnerships with local organizations and businesses to provide additional resources and support.
-Community Involvement: One of the key sustainability approaches is to involve the community in the program’s development and implementation. By involving community members, the program can create a sense of ownership and ensure that the program meets the needs of the community. The program will establish a community-based steering committee made up of key stakeholders and community leaders to ensure community involvement in program planning and decision-making.''',
            budget_requirement_text = '''
Expenses                     Amount (2 yrs, 2023-24)    Amount (1 yr, 2025-26)
Training and Capacity Building - Php 20,000.00         Php 12,000.00
Administration and Overhead  - Php 7,000.00            Php 4,000.00
Transportation               - Php 10,000.00           Php 5,000.00
Supplies                    - Php 10,000.00           Php 6,000.00
Miscellaneous                - Php 5,000.00            Php 3,500.00
Evaluation and Monitoring    - Php 8,000.00            Php 5,000.00
Total                        - Php 60,000.00           Php 35,000.00
''',
            budget_requirement_file=None,  # Set to None or a valid file if applicable
            directorSignDate='2023-05-01',
            VPRESignDate='2023-05-01',
            PRESignDate='2023-05-01',  # If PRESignDate is optional
            is_three_year_plan=True,
            is_one_year_plan=False,
            current_version_id=None,  # Set to None or appropriate version ID
            remarks=None,  # Set to None or remarks if needed
            status="Approved by President"
        )

        # Add unique signatories
        Signatory.objects.create(proposal=proposal, name="Engr.Evelyn L. De Castro", position="Proponent / CES Coordinator", section="prepared")
        Signatory.objects.create(proposal=proposal, name="DR. Luisito Lolong Lacatan", position="Dean", section="endorsed")
        Signatory.objects.create(proposal=proposal, name="Hon. Francisco Alimagno", position="Brgy. Captain", section="concurred")
        Signatory.objects.create(proposal=proposal, name="Hon. Nolasco Manimtim", position="Brgy. Captain", section="concurred")
        Signatory.objects.create(proposal=proposal, name="Hon. Richard Algire", position="Brgy. Captain", section="concurred")
        Signatory.objects.create(proposal=proposal, name="Hon. Mauro Galang", position="Brgy. Captain", section="concurred")
        Signatory.objects.create(proposal=proposal, name="Hon. Mario Servo", position="Brgy. Captain", section="concurred")
            
    #----------CCS------------#
    def create_ccs_proposal(self):
        department = Department.objects.get(dept_name="College of Computing Studies")
        proponent = Account.objects.filter(accountType="Proponent", proponentaccount__department=department).first()

        if not proponent:
            self.stdout.write(self.style.WARNING(f"No proponent found for department: {department.dept_name}. Skipping proposal creation."))
            return

        date_range = "May 2023 - December 2025"
        start_date_str, end_date_str = date_range.split(" - ")
        start_date = datetime.strptime(f"{start_date_str} 01", "%B %Y %d").date()
        end_date = datetime.strptime(f"{end_date_str} 22", "%B %Y %d").date()

        proposal = Proposal.objects.create(
            user_id=proponent,
            title='Cabuyeño\'s Computer Literacy Program (CCLIP)',
            engagement_date='2023-05-01',
            disengagement_date='2025-12-22',
            department="College of Computing Studies",
            lead_proponent="Ogalesco, Patrick Arcelito; Natividad, Reymark; Lacorte, Alice; Benegas, Daniel Matthew; Bernabe, Pamela; Rabino, Nuela Jane",
            contact_details="09053172709",
            project_description="""The extension program entitled Cabuyeño's Computer Literacy Program (CCLIP) is a social community project that aims to help the citizens of the 3 identified barangays in the City of Cabuyao to better understand the use of computer technology, internet, social media, and the role of media in our society. Even before the pandemic started, technology and the internet were used a lot. When the pandemic began, people became more focused on using them. A lot of information comes out and spreads quickly. 
            
            CCLIP is a three-year extension program covering the needs assessment of the 3 identified barangays. The training will be done once a month with a duration of 3 hours a day. Its aim is to help students and adults in Brgy. San Isidro, Cabuyao Laguna to become computer literate in ways that will help them perform their tasks well.

            For the first year, Barangay San Isidro will be the target beneficiary. Two other barangays will be identified in the next two succeeding years.
            For year 2023, CCLIP will be composed of the following:
- Seminar about responsible use of social media
- Seminar about data privacy
- Hands-on training in Office applications
- Hands-on training in computer graphics
- Hands-on training in document management using cloud-based solutions

After the first succeeding year, in 2024, CCLIP will conduct the following:
- Seminar about how to attain and verify information online
- Seminar about the usage of scholarly sources for academic work and proper use of citations
- Seminar about what to expect after graduating in programs that Computing Studies covers
- Hands-on training about basic configurations in networking
- Hands-on training about commonly used programming languages
- Hands-on training about UX/UI designing

In year 2025, CCLIP will organize the following:
- Seminar about cybersecurity and online safety best practices
- Seminar about basic internet browsing and email usage
- Hands-on training activity about teaching participants how to perform basic computer maintenance tasks (updating software, cleaning the computer, and managing files or folders)
- Introduction to Database Management
- Seminar about Digital Marketing Training on various digital marketing tools and techniques, including email marketing, SEO, SEM, and Google Analytics
- Webinar about basic computer skills (such as opening and closing applications, creating, and saving documents, and organizing files""",
            target_date=start_date,
            location="Brgy. San Isidro, Brgy. Sala, Brgy. Bigaa, Brgy. Baclaran, Brgy. Diezmo",
            partner_community="Baclaran, Bigaa, Diezmo, Sala, San Isidro",
            school=0,
            barangay=1,
            government_org="N/A",
            non_government_org="N/A",
            identified_needs_text="""Baclaran- Mobile App on Information Dissemination
San Isidro - Information and literacy training on Information Dissemination Document Management
Sala - Mobile App on Information Dissemination
Diezmo - Data Management System
Bigaa - Inventory Management System Mobile App on Information Dissemination""",
            general_objectives="To upgrade the knowledge and skills of the target beneficiaries in the use of computer software applications, hardware, internet, graphics, and social media platforms.",
            specific_objectives="""1. To assess the level of knowledge of individuals in terms of use of computer software applications, hardware, internet, data privacy, graphics, and social media platforms.
    2. To conduct specific computer seminars and trainings depending on the needs of the target beneficiaries.
    3. To train target beneficiaries on the use of computer software applications, hardware, internet, social media, data privacy, and graphics.""",
            success_indicators="""1. To assess the level of knowledge of individuals in terms of use of computer software applications, hardware, internet, data privacy, graphics, and social media platforms.
KPI: Average score of individuals' knowledge assessment
Target: Achieve an average score of 80% or higher in the knowledge assessment by the end of 2025.

2. To conduct specific computer seminars and trainings depending on the needs of the target beneficiaries.
KPI: Number of computer seminars and trainings conducted
Target: Conduct at least 20 computer seminars and trainings by the end of 2025.

3. To train target beneficiaries on the use of computer software applications, hardware, internet, social media, data privacy, and graphics.
KPI: Number of beneficiaries trained on the use of software application, hardware, internet, social media, data privacy, and graphics
Target: Train at least 500 beneficiaries on the use of computer software applications, hardware, internet, social media, data privacy, and graphics by the end of 2025.""",
            cooperating_agencies="""Brgy. Sala, Brgy. Bigaa, Brgy. Baclaran, Brgy. Diezmo

Following are the functional relationships that can exist between these two entities:

- Planning and Implementation: Barangays and PnC (UC) shall work together to plan and implement community extension programs. The barangay shall provide local knowledge and expertise about the community's needs, while the university can provide technical expertise and resources to support the program's implementation.
Output: Needs Assessment and CES Plan 2023-2025.
- Resource Mobilization: Barangays and PnC (UC) shall work together to mobilize resources for community extension programs. The barangay can provide local resources such as manpower and facilities, while the university can provide technical resources to support the program.

- Capacity Building: PnC (UC) can support the barangay's capacity-building efforts by providing training and technical assistance. This can include training on project management, community organizing, and other relevant skills needed to implement successful community extension programs.

Resource requirements for community extension programs can vary depending on the nature and scope of the program. Some of the resources required include:
1. Financial Resources: Community extension programs require funding to support program activities such as training, outreach, and resource mobilization. The barangay and PnC (UC) can work together to identify funding sources for the program.
2. Human Resources: Community extension programs require a team of skilled and dedicated personnel to implement the program effectively. The barangay and PnC (UC) can work together to identify and train the required human resources needed for the program.
3. Technical Resources: Community extension programs require access to technical resources such as research materials, data, and equipment. The university can provide access to these resources to support the program's implementation.""",
            monitoring_mechanics="""- Regular progress reports: The program's implementing team will prepare regular progress reports on the program's implementation and performance. These reports shall include details on the number of beneficiaries, training sessions conducted, and the outcomes achieved.

- Participant feedback: The program shall collect feedback from participants on the quality and relevance of the training provided. This can be done through surveys, focus group discussions, or one-on-one interviews.

- Data analysis: The program's implementing team can analyze program data, including attendance records and pre- and post-training assessment scores, to evaluate the program's effectiveness and identify areas for improvement.""",
            evaluation_mechanics="""- Pre and Post Test Assessments and Activities will be given to participants every session/series (Please see Timetable for specifics).

- Pre and Post Test Results will be gathered and analyzed. Components will be:
  1. Pre Test Assessment/Activity - 10 to 15 items of questions to check knowledge and familiarity of the participants to the topic.
  2. Post Test Assessment/Activity - 10 to 15 items of questions to check if the participants had gained new knowledge after the discussion/activity.

- Program Evaluation will be given to the participants to know areas for improvement during the conduct of the session.""",
            timetable="""CCLIP will conduct the following events in year 2023:

- **May 2023**:
  Target Participants: Brgy. Officials, SK Officers, Women’s Sector, Interested Parents, and Senior Citizens
  Task: Seminar about responsible use of social media

- **June 2023**:
  Target Participants: Brgy. Officials, SK Officers, Women’s Sector, Interested Parents, and Senior Citizens
  Task: Seminar about data privacy

- **July - September 2023**:
  Target Participants: Brgy. Officials, SK Officers, Women’s Sector, Interested Parents, and Senior Citizens
  Task: Hands-on training in Office applications

- **October - November 2023**:
  Target Participants: Brgy. Officials, SK Officers, Women’s Sector, Interested Parents, and Senior Citizens
  Task: Hands-on training in computer graphics

- **December 2023**:
  Target Participants: Brgy. Officials, SK Officers, Women’s Sector, Interested Parents, and Senior Citizens
  Task: Hands-on training in document management using cloud-based solutions
<<<<<<< Updated upstream

=======
  
>>>>>>> Stashed changes
  CCLIP will conduct the following events in year 2024:

- **January 2024**:
  Target Participants: Brgy. Officials, SK Officers, Women’s Sector, Interested Parents, and Senior Citizens
  Task: Seminar about how to attain and verify information online

- **February - March 2024**:
  Target Participants: Brgy. Officials, SK Officers, Women’s Sector, Students, and Interested Parents
  Task: Seminar about the usage of scholarly sources for academic work and proper use of citations

- **April - May 2024**:
  Target Participants: Brgy. Officials, SK Officers, Women’s Sector, Interested Parents, Students, and Senior Citizens
  Task: Seminar about what to expect after graduating in programs that Computing Studies covers

- **June - July 2024**:
  Target Participants: Brgy. Officials, SK Officers, Women’s Sector, Students, and Interested Parents
  Task: Hands-on training about basic configurations in networking

- **August - October 2024**:
  Target Participants: Brgy. Officials, SK Officers, Women’s Sector, Students, and Interested Parents
  Task: Hands-on training about commonly used programming languages

- **November - December 2024**:
  Target Participants: Brgy. Officials, SK Officers, Women’s Sector, Students, and Interested Parents
  Task: Hands-on training about UX/UI designing
<<<<<<< Updated upstream

=======
  
>>>>>>> Stashed changes
  CCLIP will conduct the following events in year 2025:

- **May 2025**:
  Target Participants: Brgy. Officials, SK Officers, Women’s Sector, Interested Parents, and Senior Citizens
  Task: Seminar about cybersecurity and online safety best practices

- **June 2025**:
  Target Participants: Brgy. Officials, SK Officers, Women’s Sector, Interested Parents, and Senior Citizens
  Task: Seminar about basic internet browsing and email usage

- **July - August 2025**:
  Target Participants: Brgy. Officials, SK Officers, Women’s Sector, and Interested Parents
  Task: Hands-on training activity about teaching participants how to perform basic computer maintenance tasks (updating software, cleaning the computer, and managing files or folders)

- **September 2025**:
  Target Participants: Brgy. Officials, SK Officers, Women’s Sector, Interested Parents, and Senior Citizens
  Task: Webinar about Introduction to Database Management

- **October - November 2025**:
  Target Participants: Brgy. Officials, SK Officers, Women’s Sector, Interested Parents, and Senior Citizens
  Task: Seminar about Digital Marketing Training on various digital marketing tools and techniques, including email marketing, SEO, SEM, and Google Analytics

- **December 2025**:
  Target Participants: Brgy. Officials, SK Officers, Women’s Sector, Interested Parents, and Senior Citizens
  Task: Webinar about basic computer skills (such as opening and closing applications, creating and saving documents, and organizing files)""",
            risk_assessment="""1. Unwanted distribution of learning materials
2. Security during the session might be compromised by unwanted/unregistered participants
3. Lack of community participation
4. Insufficient resources
5. Limited access to technology
6. Low retention rate
7. Security and privacy risks
8. Change of leadership due to forthcoming election""",
            action_plans="""1. To give waiver or consent form to participants. Avoid giving handouts and create Google forms for assessments/activities.
2. List of participants must be accomplished through the LGU together with proof of identification. Security personnel will be requested to the LGU as well.
3. Engage with the community by involving local leaders, using social media and community events to promote the program, and offering incentives to encourage participation.
4. Explore partnerships with local businesses or government agencies to secure additional resources, solicit donations or sponsorships, and seek grants from private foundations or non-governmental organizations.
5. Explore partnership with local businesses or institutions to provide access to their facilities, and offer alternative training methods, such as mobile learning or online courses.
6. Offer flexible scheduling and accommodate participants' needs, provide ongoing support and mentorship, and offer incentives for completing the program.
7. Implement security protocols and best practices, provide training on safe online behavior, and use secure software and tools for data management.
8. Conduct stakeholder engagement and buy-in: Engage the new leadership in the planning and implementation of the project. This can help to build trust and understanding between the project team and the new leadership.""",
            sustainability_approaches="""- Progress and learning outcomes will be monitored and checked every session by means of Post and Pre Test Assessments and Activities. These will be gathered and analyzed if the objective of the extension/program was attained. The selected community of the extension/program will be revisited to check if the learning outcomes were applied and used by the participants.

- Partnerships: Building strong partnerships with local organizations and businesses is essential for the sustainability of the program. These partnerships can provide access to resources and expertise needed to sustain the program, such as funding, computer equipment, and software.

- Community ownership: Encouraging community ownership of the program is vital for its sustainability. This can be achieved by involving community members in the planning and implementation of the program, promoting their active participation, and recognizing their contributions to the program’s success.

- Capacity building: Developing the capacity of community members to manage and sustain the program is critical. This can be done by providing training and mentorship to community leaders and members to ensure they have the skills and knowledge necessary to manage the program effectively.

- Continuous evaluation: Regular monitoring and evaluation of the program can help identify areas that need improvement and ensure that the program is meeting its goals. This can also help to identify opportunities for the program to be expanded or replicated in other communities.

- Resource mobilization: The program needs to identify and mobilize resources to ensure its sustainability. This includes developing a fundraising plan and seeking funding from a variety of sources, including government agencies, private donors, and corporate partners.

- Leveraging technology: The use of technology can help to sustain the program by providing access to online resources and courses, as well as facilitating remote training and mentorship.

- Participants’ support and mentorship: Providing ongoing support and mentorship to those who attended the program can help to sustain the program’s impact. They can act as advocates or trainers within their own communities, further spreading the benefits of the program.Participants can be encouraged to become mentors or trainers themselves, thus sustaining the program’s impact beyond its initial implementation.""",
            budget_requirement_text="""CCLIP BUDGET FOR YEAR 2023:
Month       Training Day Budget
May         Php 4,000.00
June        Php 4,000.00
July        Php 4,000.00
August      Php 4,000.00
September   Php 4,000.00
October     Php 4,000.00
November    Php 4,000.00
December    Php 4,000.00
TOTAL: Php 32,000.00 ESTIMATED BUDGET FOR YEAR 2023

CCLIP BUDGET FOR YEAR 2024:
Month       Training Day Budget
January     Php 4,000.00
February    Php 4,000.00
March       Php 4,000.00
April       Php 4,000.00
May         Php 4,000.00
June        Php 4,000.00
July        Php 4,000.00
August      Php 4,000.00
September   Php 4,000.00
October     Php 4,000.00
November    Php 4,000.00
December    Php 4,000.00
TOTAL: Php 48,000.00 ESTIMATED BUDGET FOR YEAR 2024

CCLIP BUDGET FOR YEAR 2025:
Month       Training Day Budget
January     Php 4,000.00
February    Php 4,000.00
March       Php 4,000.00
April       Php 4,000.00
May         Php 4,000.00
June        Php 4,000.00
July        Php 4,000.00
August      Php 4,000.00
September   Php 4,000.00
October     Php 4,000.00
November    Php 4,000.00
December    Php 4,000.00
TOTAL: Php 48,000.00 ESTIMATED BUDGET FOR YEAR 2025

CCLIP BUDGET BREAKDOWN EACH TRAINING SESSION:
A budget of Php 4,000.00 will be allotted each training day to secure the foods and transportation of the volunteer officers that will cover the expenses for the preparation and implementation of the program. 

Main Source of Funds: Income generated through selling "kakalok" that’ll be proposed as the fund-raising activity to support the program.

BUDGET ALLOCATION:
Particulars         Amount Allocated
Food Allowance     Php 2,000.00
Transpo Allowance  Php 1,500.00
Materials           Php 300.00
Raffle Prizes       Php 200.00
TOTAL: Php 4,000.00

Additional Note: The budget may differ in each training day in case of any circumstances that may happen or problems that will be encountered, rest assured that the budget will be used solely for the program itself.""",
            budget_requirement_file=None,
            directorSignDate='2023-05-01',
            VPRESignDate='2023-05-01',
            PRESignDate='2023-05-01',
            is_three_year_plan=True,
            is_one_year_plan=False,
            current_version_id=None,
            remarks=None,
            status="Approved by President"
        )

         # Add unique signatories
        Signatory.objects.create(proposal=proposal, name="Mr.Benegas, Daniel Matthew ", position="Proponent / CES Coordinator", section="prepared")
        Signatory.objects.create(proposal=proposal, name="Ms. Bernabe. Pamela ", position="Proponent / CES Coordinator", section="prepared")
        Signatory.objects.create(proposal=proposal, name="Ms. Rabino, Nuela Jane", position="Proponent / CES Coordinator", section="prepared")
        Signatory.objects.create(proposal=proposal, name="DR. Lacorte", position="Dean", section="endorsed")
        Signatory.objects.create(proposal=proposal, name="Hon. Francisco Alimagno", position="Brgy. Captain", section="concurred")
        Signatory.objects.create(proposal=proposal, name="Hon. Nolasco Manimtim", position="Brgy. Captain", section="concurred")
        Signatory.objects.create(proposal=proposal, name="Hon. Richard Algire", position="Brgy. Captain", section="concurred")
        Signatory.objects.create(proposal=proposal, name="Hon. Mauro Galang", position="Brgy. Captain", section="concurred")
        Signatory.objects.create(proposal=proposal, name="Hon. Mario Servo", position="Brgy. Captain", section="concurred")

    def create_cbaa_proposal(self):
      department = Department.objects.get(dept_name="College of Business Administration and Accountancy")
      proponent = Account.objects.filter(accountType="Proponent", proponentaccount__department=department).first()

      if not proponent:
          self.stdout.write(self.style.WARNING(f"No proponent found for department: {department.dept_name}. Skipping proposal creation."))
          return
      
      date_range = "May 2023 - December 2026"
      start_date_str, end_date_str = date_range.split(" - ")
      start_date = datetime.strptime(f"{start_date_str} 01", "%B %Y %d").date()
      end_date = datetime.strptime(f"{end_date_str} 01", "%B %Y %d").date()

      proposal = Proposal.objects.create(
          user_id=proponent,
          title='Karunungan, Kabuhayan, Kaunlaran (KKK): Financial Literacy and Livelihood Program',
          engagement_date='2023-05-01',
          disengagement_date='2026-12-01',
          department=department.dept_name,
          lead_proponent="Flordeliza S. Em",
          contact_details="N/A",
          project_description = """The Financial Literacy and Livelihood Program aims to empower individuals and families in the community by equipping them with the necessary skills and knowledge to improve their financial management practices and create sustainable livelihoods. The program will provide participants with comprehensive training and resources to enable them to make informed decisions about their finances and explore opportunities to generate income.

The program will target Solo Parents and Out of School Youth, who face significant financial challenges and lack access to resources and information to improve their financial status. The program will be implemented in collaboration with local organizations and government agencies to ensure its effectiveness and sustainability.

The program will consist of two main projects:
1. **Financial Literacy Training**: Participants will receive training on financial management practices, including budgeting, saving, debt management, and investment. They will also learn about financial planning and how to access financial services, such as banking and credit. The training will be delivered through interactive workshops, resources, and mentoring.
2. **Livelihood Development**: Participants will be given access to resources and support to help them establish sustainable livelihoods. This includes training on entrepreneurship, business planning, and marketing. The program will also provide access to microfinance loans, grants, and other resources to help participants start or expand their businesses.""",

          target_date=start_date,
          location="Baclaran, San Isidro, Sala, Diezmo, Bigaa",
          partner_community="Baclaran, Bigaa, Diezmo, Sala, San Isidro",
          school=0,
          barangay=1,
          government_org="N/A",
          non_government_org="N/A",
          identified_needs_text="Baclaran, San Isidro, Sala, Diezmo, Bigaa: Financial Literacy, Livelihood Training",
          general_objectives="""To empower solo parents and OSY in the community by providing them with the necessary skills and knowledge to improve their financial management practices and create sustainable livelihoods.""",
          specific_objectives="""1. . To develop their ability to cope up with the decreasing and weakening Filipino purchasing power.
2. To increase financial literacy among program participants, leading to improved financial management practices and decision-making.
3. To provide participants with access to resources and support to help them establish sustainable livelihoods, including training on entrepreneurship, business planning, and marketing.
4. To provide participants with access to microfinance loans, grants, and other resources to help them start or expand their businesses.""",
          success_indicators="""1. Developing Efficient Budget Plan - To develop their ability to cope up with the decreasing and weakening Filipino purchasing power.
KPI: Increase in program participants' income
Target: Achieve an average increase of 30% in program participants' income by the end of 2025

2. Enhancing Financial Literacy - To increase financial literacy among program participants, leading to improved financial management practices and decision-making.
KPI: Improvement in program participants' financial literacy
Target: Achieve an average increase of 50% in program participants' financial literacy by the end of 2025

3. Acquiring Entrepreneurial Skills - To provide participants with access to resources and support to help them establish sustainable livelihoods, including training on entrepreneurship, business planning, and marketing.
KPI: Number of participants who start or expand their businesses
Target: Have at least 50 participants start or expand their businesses by the end of 2025

4. Complying to loan requirements - To provide participants with access to microfinance loans, grants, and other resources to help them start or expand their businesses.
KPI: Amount of microfinance loans disbursed and grants awarded
Target: Disburse at least Php 1,000,000 worth of microfinance loans and award at least Php 500,000 worth of grants to program participants by the end of 2025""",
          cooperating_agencies = """Resource requirements for community extension programs can vary depending on the nature and scope of the program. Some of the resources required include:

- Financial Resources: Community extension programs require funding to support program activities such as training, outreach, and resource mobilization. The barangay and PnC (UC) can work together to identify funding sources for the program.

- Human Resources: Community extension programs require a team of skilled and dedicated personnel to implement the program effectively. The barangay and PnC (UC) can work together to identify and train the required human resources needed for the program.

- Technical Resources: Community extension programs require access to technical resources such as research materials, data, and equipment. The university can provide access to these resources to support the program’s implementation.""",
          monitoring_mechanics="""Regular progress reports: The program's implementing team will prepare regular progress reports on the program's implementation and performance. These reports shall include details on the number of beneficiaries, training sessions conducted, and the outcomes achieved.

- Every activity (trainings) will have assessment tool to know from the recipients if they have learned the outcomes being taught. Outcomes will also be evaluated based on their performance as they have initiated and implemented the livelihood suggested for them to pursue based on the skills they have learned. This will be done every 2nd and 4th quarter of the month from the beginning of the program up to the last day of the program's implementation.

- Participant feedback: The program shall collect feedback from participants on the quality and relevance of the training provided. This can be done through surveys, focus group discussions, or one-on-one interviews.

- Data analysis: The program's implementing team can analyze program data, including attendance records and pre- and post-training assessment scores, to evaluate the program's effectiveness and identify areas for improvement.""",

          evaluation_mechanics="""Self-made tool activity evaluation will be utilized and administer onsite """,
          timetable = """First Cycle (first 10-15 recipients):
- April 24, 2023: Coordinate with the Barangays
- May 4, 2023: Personal Financial Literacy Seminar
- May 2023 (last week): Skills Training in partnership with TESDA and Selected Cooperatives
- June-September 2023 (2nd and 4th quarter): Monitoring and Evaluation

Second Cycle (16-30 recipients):
- October 6, 2023: Coordinate with the Barangays
- October 12-13, 2023: Personal Financial Literacy Seminar
- November 2023: Skills Training in partnership with TESDA and Selected Cooperatives
- December 2023-March 2024 (2nd and 4th quarter): Monitoring and Evaluation

Third Cycle (31-45 recipients):
- April 24, 2024: Coordinate with the Barangays
- April 27-29, 2024: Personal Financial Literacy Seminar
- May 2024: Skills Training in partnership with TESDA and Selected Cooperatives
- June-September 2024 (2nd and 4th quarter): Monitoring and Evaluation

Fourth Cycle (46-60 recipients):
- October 6, 2024: Coordinate with the Barangays
- October 12-13, 2024: Personal Financial Literacy Seminar
- November 2024: Skills Training in partnership with TESDA and Selected Cooperatives
- December 2024-March 2025 (2nd and 4th quarter): Monitoring and Evaluation""",
          risk_assessment = """1. Schedule conflicts
2. Unavailability of venues / limited resources
3. Resistance to change of community participants
4. Market fluctuations or natural disasters may affect the success of the program
5. Change of leadership due to forthcoming election""",

          action_plans = """1. Flexibility on time
2. Advance coordination with the partner unit
3. Motivational activities such as games, raffles, and the like
4. Identify sources of funding and secure resources needed to implement the program
5. Conduct stakeholder engagement and buy-in: Engage the new leadership in the planning and implementation of the project. This can help to build trust and understanding between the project team and the new leadership.""",
          sustainability_approaches="""1. Capacity building: Build the capacity of the program participants by providing them with training, tools, and resources that will enable them to manage their finances and livelihoods effectively. This can include providing training on financial management, entrepreneurship, and business planning.

2. Establishing partnerships: Forge partnerships with local organizations, government agencies, and other stakeholders to leverage resources and build support for the program. This can help ensure that the program is integrated into the community and that it can continue to operate even after the initial implementation phase.

3. Encouraging community participation: Encourage the participation of the community in the program by involving them in the planning, implementation, and monitoring of the program. This can help build community ownership and support for the program, which can increase the likelihood of its sustainability.

4. Developing sustainable business models: Encourage participants to develop sustainable business models that will enable them to generate income and grow their businesses over time. This can include providing access to microfinance loans, grants, and other resources that will help them start or expand their businesses.""",
          budget_requirement_text="""Session 1 – Financial Management Literacy:
- Food for participants: (750.00 x 5 brgys = 3,750)
- Transportation expense for the students: (500.00 x 5 brgys = 2,500)
- Documentation and Miscellaneous expenses: (500.00 x 5 brgys = 2,500)
Total: Php 8,750.00

Session 2 – Skills Training with TESDA:
- Food for participants: (750.00 x 5 brgys = 3,750)
- Transportation expense for the students: (500.00 x 5 brgys = 2,500)
- Documentation and Miscellaneous expenses: (500.00 x 5 brgys = 2,500)
Total: Php 8,750.00

Session 3 – Livelihood Training:
- Food for participants: (750.00 x 5 brgys = 3,750)
- Transportation expense for the students: (500.00 x 5 brgys = 2,500)
- Documentation and Miscellaneous expenses: (500.00 x 5 brgys = 2,500)
Total: Php 8,750.00

Session 4 – Entrepreneurial Finance:
- Food for participants: (750.00 x 5 brgys = 3,750)
- Transportation expense for the students: (500.00 x 5 brgys = 2,500)
- Documentation and Miscellaneous expenses: (500.00 x 5 brgys = 2,500)
Total: Php 8,750.00

Grand Total for Cycle 1: Php 35,000.00""",
          budget_requirement_file=None,
          directorSignDate='2023-05-01',
          VPRESignDate='2023-05-01',
          PRESignDate='2023-05-01',
          is_three_year_plan=True,
          is_one_year_plan=False,
          current_version_id=None,
          remarks=None,
          status="Approved by President"
      )

      # Add unique signatories
      Signatory.objects.create(proposal=proposal, name="Flordeliza S. Em", position="Proponent / CES Coordinator", section="prepared")
      Signatory.objects.create(proposal=proposal, name="Dr. Fernando T. Pendon III", position="Dean", section="endorsed")
      Signatory.objects.create(proposal=proposal, name="Hon. Francisco Alimagno", position="Brgy. Captain", section="concurred")
      Signatory.objects.create(proposal=proposal, name="Hon. Nolasco Manimtim", position="Brgy. Captain", section="concurred")
      Signatory.objects.create(proposal=proposal, name="Hon. Richard Algire", position="Brgy. Captain", section="concurred")
      Signatory.objects.create(proposal=proposal, name="Hon. Mauro Galang", position="Brgy. Captain", section="concurred")
      Signatory.objects.create(proposal=proposal, name="Hon. Mario Servo", position="Brgy. Captain", section="concurred")

    def create_chas_proposal(self):
      department = Department.objects.get(dept_name="College of Health and Allied Sciences")
      proponent = Account.objects.filter(accountType="Proponent", proponentaccount__department=department).first()

      if not proponent:
          self.stdout.write(self.style.WARNING(f"No proponent found for department: {department.dept_name}. Skipping proposal creation."))
          return
      
      date_range = "May 2023 - December 2025"
      start_date_str, end_date_str = date_range.split(" - ")
      start_date = datetime.strptime(f"{start_date_str} 01", "%B %Y %d").date()
      end_date = datetime.strptime(f"{end_date_str} 01", "%B %Y %d").date()

      proposal = Proposal.objects.create(
          user_id=proponent,
          title='Healthy Community, Healthy Families: Empowering Individuals Through Health and Wellness Education and Training',
          engagement_date='2023-05-02',
          disengagement_date='2025-12-01',
          department=department.dept_name,
          lead_proponent="SHALINI S. BARROSO, MAN RN, DR. JINKY C. MALABANAN, DR. MA. GLORIA G. GREGANDA, ISABELITA N. ISIP, MAN RN",
          contact_details="N/A",
          project_description="""This community extension project aims to provide various training and education programs that promote health, wellness, and safety among families and individuals. The project will include the following themes:
          1. Mental Readiness for Parents with Children with Special Needs: This training program will equip parents and caregivers of children with special needs with skills and knowledge to manage stress and promote mental wellness for themselves and their children.
          2. Alternative Medicine and Health Training: This program will provide training on alternative medicine practices, such as acupuncture, herbal medicine, and massage therapy, as well as promoting healthy lifestyle habits such as exercise and healthy eating.
          3. Self-Defense Training: This program will provide basic self-defense techniques and strategies to help individuals feel more confident and secure in their daily lives.
          4. Medical and Dental Education: This program will provide education on basic medical and dental care, including first aid training and preventive care.
          5. Sports and Wellness Program: This program will encourage physical activity and healthy habits through various sports and wellness activities.
          6. Counseling Advice: This program will provide counseling services to individuals and families who need support in coping with mental health challenges.
          7. Nutrition and Family Planning (Teenage Pregnancy): This program will provide education on healthy nutrition and family planning, with a focus on preventing teenage pregnancy.
          8. Value Formation: This program will promote the development of positive values such as respect, responsibility, and compassion, to foster a healthy and supportive community.
          9. Feeding Program: The program is to improve the health and well-being of individuals and families by ensuring they have access to sufficient, nutritious food.
          Through these training and education programs, the "Community Health and Wellness: Empowering Families and Individuals" project aims to promote the physical, mental, and emotional well-being of community members and build a stronger, healthier, and more supportive community.""",
          target_date=start_date,
          location="Baclaran, San Isidro, Diezmo, Sala, Bigaa",
          partner_community="Baclaran, Bigaa, Diezmo, Sala, San Isidro",
          school=0,
          barangay=1,
          government_org="City Health Office",
          non_government_org="N/A",
          identified_needs_text="""1. Mental Readiness for Parents with Children with Special Needs: Equipping parents and caregivers with skills and knowledge to manage stress and promote mental wellness.
2. Alternative Medicine and Health Training: Providing education on alternative medicine practices like acupuncture and promoting healthy lifestyle habits.
3. Self-Defense Training: Teaching basic self-defense techniques and strategies for confidence and security.
4. Medical and Dental Education: Educating on basic medical and dental care, including first aid training and preventive care.
5. Sports and Wellness Program: Encouraging physical activity and healthy habits through sports and wellness activities.
6. Counseling Advice: Providing counseling services for mental health support.
7. Nutrition and Family Planning (Teenage Pregnancy): Educating on healthy nutrition and family planning with a focus on teenage pregnancy prevention.
8. Value Formation: Promoting the development of positive values to foster a supportive community.
9. Feeding Program: Ensuring health and well-being through access to sufficient nutritious food.""",
          general_objectives="""To improve the health and wellness of families and individuals in the community by providing training and education programs that promote physical, mental, and emotional well-being.""",
          specific_objectives="""1. To equip parents and caregivers of children with special needs with skills and knowledge to manage stress and promote mental wellness for themselves and their children.
          2. To provide education on alternative medicine practices and promote healthy lifestyle habits such as exercise and healthy eating.
          3. To provide basic self-defense techniques and strategies to help individuals feel more confident and secure in their daily lives.
          4. To provide education on basic medical and dental care, including first aid training and preventive care.
          5. To encourage physical activity and healthy habits through various sports and wellness activities.
          6. To provide counseling services to individuals and families who need support in coping with mental health challenges.
          7. To provide education on healthy nutrition and family planning, with a focus on preventing teenage pregnancy.
          8. To promote the development of positive values such as respect, responsibility, and compassion, to foster a healthy and supportive community.
          9. To provide feeding programs for children and families to ensure proper nutrition and promote overall health.""",
          success_indicators="""1. At least 50 parents and caregivers of children with special needs will complete the mental readiness training program by 2025.
          2. At least 100 participants will adopt healthy lifestyle habits after the alternative medicine and health training program by 2025.
          3. At least 50 participants will report feeling more confident and secure after the self-defense training program by 2025.
          4. At least 150 participants will regularly engage in physical activity after the sports and wellness program by 2025.
          5. At least 100 participants will complete the medical and dental education program and can perform basic first aid procedures by 2025.
          6. At least 50 individuals and families will receive counseling services and report improvement in their mental health by 2025.
          7. At least 100 participants will gain knowledge on healthy nutrition and family planning after attending the program by 2025.
          8. At least 200 community members will participate in values formation activities and report improvement in their attitudes and behaviors by 2025.
          9. At least 50 children and families will receive feeding programs and report improvement in their overall health by 2025.""",
          cooperating_agencies="""Brgy. Sala, Brgy. Bigaa, Brgy. Baclaran, Brgy. Diezmo, and Ba

Planning and Implementation: Barangays and PnC (UC) shall work together to plan and implement community extension programs. The barangay shall provide local knowledge and expertise about the community's needs, while the university can provide technical expertise and resources to support the program's implementation. Output: Needs Assessment and CES Plan 2023-2025

Resource Mobilization: Barangays and PnC (UC) shall work together to mobilize resources for community extension programs. The barangay can provide local resources such as manpower and facilities, while the university can provide technical resources to support the program.

Capacity Building: PnC (UC) can support the barangay's capacity building efforts by providing training and technical assistance. This can include training on project management, community organizing, and other relevant skills needed to implement successful community extension programs.

Resource requirements for community extension programs can vary depending on the nature and scope of the program. Some of the resources required include:
- Financial Resources: Community extension programs require funding to support program activities such as training, outreach, and resource mobilization. The barangay and PnC (UC) can work together to identify funding sources for the program.
- Human Resources: Community extension programs require a team of skilled and dedicated personnel to implement the program effectively. The barangay and PnC (UC) can work together to identify and train the required human resources needed for the program.
- Technical Resources: Community extension programs require access to technical resources such as research materials, data, and equipment. The university can provide access to these resources to support the program's implementation.""",
          monitoring_mechanics="""- Regular monitoring of program implementation: The program implementation will be monitored regularly to ensure that activities are carried out as planned and to identify any challenges or issues that need to be addressed. This will be done through regular meetings with program staff, partners, and stakeholders.
- Data collection: Relevant data will be collected to assess the impact of the program on individuals and the community. This includes quantitative data such as the number of participants in each program, their demographic information, and their feedback on the program's effectiveness. Qualitative data will also be collected through surveys and interviews to understand the participants' experience and identify areas for improvement.
- Data analysis: Data collected will be analyzed to assess the effectiveness of the program and identify areas for improvement. This will include analysis of quantitative data to determine whether the program targets and objectives have been met, as well as analysis of qualitative data to identify program strengths and areas for improvement.
- Regular reporting: Regular reporting on program progress will be done to keep stakeholders informed on the program's performance. Reports will be produced on a regular basis and shared with the barangay.
- Evaluation: A formal evaluation will be conducted at the end of the program to assess the program's overall impact and effectiveness. This will involve a review of program data and feedback from participants, staff, and stakeholders. The evaluation will also identify lessons learned and provide recommendations for future program improvements.
- Adjustments and improvements: Based on the evaluation findings, adjustments and improvements will be made to the program to ensure its continued effectiveness and relevance.""",
          evaluation_mechanics = """- Regular reporting: Regular reporting on program progress will be done to keep stakeholders informed on the program's performance. Reports will be produced on a regular basis and shared with the barangay.
- Evaluation: A formal evaluation will be conducted at the end of the program to assess the program's overall impact and effectiveness. This will involve a review of program data and feedback from participants, staff, and stakeholders. The evaluation will also identify lessons learned and provide recommendations for future program improvements.
- Adjustments and improvements: Based on the evaluation findings, adjustments and improvements will be made to the program to ensure its continued effectiveness and relevance.
""",
          timetable = """
1. May 2-July 31, 2023:
   - Define the target population
   - Determine the resources needed
   - Partner with other organizations or stakeholders to support the program
   - Develop the program plan
2. August 1-31, 2023:
   - Launching of all programs
   - Introduction to the community/target population
3. September 1-November 30, 2023:
   - Initial Phase Implementation of the program per identified needs
4. December 2023:
   - Outreach Program Implementation
   - Medical and Dental Mission Implementation
   - Initial Evaluation of the Program
5. January-June 2024:
   - Second Phase Implementation
   - Partial Evaluation of the Program
6. July-December 2024:
   - Third Phase Implementation (possible of another or additional set or number of target population if the second phase is successful)
   - Monitoring and Evaluation of the Program
   - Trainings of the community member as counselor, leader, etc.
   - Outreach Program Implementation
7. January-June 2025:
   - Fourth Phase Implementation (possible of another or additional set or number of target population if the third phase is successful)
   - Continues training of the community members
   - Monitoring and Evaluation of the Program
8. July-December 2025:
   - Fifth Phase Implementation
   - Consider the long-term sustainability of the program by developing strategies for ongoing funding and support
   - Supervise trained community members as first aid responders, counselors, etc.
   - Final Evaluation of the Program
   - Termination Phase
""",
          risk_assessment="""1. Lack of community participation.
          2. Lack of funding.
          3. Lack of qualified personnel.
          4. Resistance to change.
          5. Limited access to resources
          6. Change of leadership due to forthcoming election""",
          action_plans = """
1. Lack of community participation: The program should be designed with input from the community, and ongoing efforts should be made to ensure community engagement and participation.
2. Lack of funding: The program can explore partnerships with local government units, NGOs, and private organizations to secure additional funding and resources. The program can also conduct fundraising campaigns and seek donations from individuals or businesses.
3. Lack of qualified personnel: The program can provide incentives and professional development opportunities for its trainers to increase their motivation and job satisfaction. The program can also establish a mentorship program to support new trainers and ensure consistency in the delivery of the program's objectives.
4. Resistance to change: The program should have a robust community engagement strategy in place, which includes education and awareness-raising activities to address misconceptions and resistance to change.
5. Limited access to resources: The program should identify and address barriers to participation, such as providing transportation or offering remote program options.
6. Conduct stakeholder engagement and buy-in: Engage the new leadership in the planning and implementation of the project. This can help to build trust and understanding between the project team and the new leadership.
""",
          sustainability_approaches="""1. Community ownership and engagement: The program will be designed with input from the community and stakeholders. This ensures that the program meets the needs of the community and promotes community ownership and engagement, which can increase the program's sustainability.
2. Capacity building: The program will focus on building the capacity of the community and local organizations. This includes providing training and resources to empower individuals and organizations to continue the program's activities after the program ends.
3. Partnerships: The program will establish partnerships with local organizations, government agencies, and other stakeholders. This can help sustain the program's activities and ensure that the program is integrated into the local healthcare system.
4. Advocacy and awareness: The program should advocate for policies and practices that support community health and wellness. This includes raising awareness about health issues and advocating for policies and practices that promote community health and wellness.""",
         budget_requirement_text="""Feeding Program (50 target population):
- Php 50.00 per individual meal by 50 target population = Php 2,500.00/meal
  (Varies on the number of days, ideally 1000 days)
  = Php 2,500.00/meal/session

Education Program (Medical, Dental, Family Planning, Nutrition, and First Aid Procedures) (100 target population):
- Snacks for 100 target population (Php 50.00 by 100 target population)
  = Php 5,000.00 per session

Mental Health Program (50 target population):
- Snacks (Php 50.00 by 50 target population)
  = Php 2,500.00/session

Sports and Wellness Program (150 target population):
- Trainer’s/Coach Fee Php 3,000.00
- Snacks/Refreshment Php 7,500.00
  = Php 10,500.00/session

Alternative Medicine (100 target population):
- Trainer’s Fee/Professional Fee Php 5,000.00
- Snacks Php 5,000.00
  = Php 10,000.00/session

Values Formation and Counseling Program (250 target population):
- Resource Speaker Php 10,000.00
- Snacks Php 12,500.00
  = Php 22,500.00/session

Self Defense Training Program (50 target population):
- Trainer’s Fee/Coach Php 3,000.00
- Snacks/Refreshment Php 2,500.00
  = Php 5,500.00/session""",

          budget_requirement_file=None,
          directorSignDate='2023-05-02',
          VPRESignDate='2023-05-02',
          PRESignDate='2023-05-02',
          is_three_year_plan=True,
          is_one_year_plan=False,
          current_version_id=None,
          remarks=None,
          status="Approved by President"
      )

      # Add unique signatories
      Signatory.objects.create(proposal=proposal, name="Dr. Ma. Gloria G. Greganda", position="CES Coordinator", section="prepared")
      Signatory.objects.create(proposal=proposal, name="Isabelita N. Isip, Man RN", position="CES Coordinator", section="prepared")
      Signatory.objects.create(proposal=proposal, name="Dr. Jinky C. Malabanan", position="Dean", section="endorsed")
      Signatory.objects.create(proposal=proposal, name="Shalini S. Barroso, MAN RN", position="Dean", section="endorsed")
      Signatory.objects.create(proposal=proposal, name="Hon. Francisco Alimagno", position="Brgy. Captain", section="concurred")
      Signatory.objects.create(proposal=proposal, name="Hon. Nolasco Manimtim", position="Brgy. Captain", section="concurred")
      Signatory.objects.create(proposal=proposal, name="Hon. Richard Algire", position="Brgy. Captain", section="concurred")
      Signatory.objects.create(proposal=proposal, name="Hon. Mauro Galang", position="Brgy. Captain", section="concurred")
      Signatory.objects.create(proposal=proposal, name="Hon. Mario Servo", position="Brgy. Captain", section="concurred")

    def create_cas_proposal(self):
      department = Department.objects.get(dept_name="College of Arts and Sciences")
      proponent = Account.objects.filter(accountType="Proponent", proponentaccount__department=department).first()

      if not proponent:
          self.stdout.write(self.style.WARNING(f"No proponent found for department: {department.dept_name}. Skipping proposal creation."))
          return
      
      date_range = "May 2023 - December 2025"
      start_date_str, end_date_str = date_range.split(" - ")
      start_date = datetime.strptime(f"{start_date_str} 01", "%B %Y %d").date()
      end_date = datetime.strptime(f"{end_date_str} 01", "%B %Y %d").date()

      proposal = Proposal.objects.create(
          user_id=proponent,
          title='Healthy Community, Healthy Families: Empowering Individuals Through Health and Wellness Education and Training',
          engagement_date='2023-05-02',
          disengagement_date='2025-12-01',
          department=department.dept_name,
          lead_proponent="SHALINI S. BARROSO, MAN RN, DR. JINKY C. MALABANAN, DR. MA. GLORIA G. GREGANDA, ISABELITA N. ISIP, MAN RN",
          contact_details="N/A",
          project_description="""This community extension project aims to provide various training and education programs that promote health, wellness, and safety among families and individuals. The project will include the following themes:
          1. Mental Readiness for Parents with Children with Special Needs: This training program will equip parents and caregivers of children with special needs with skills and knowledge to manage stress and promote mental wellness for themselves and their children.
          2. Alternative Medicine and Health Training: This program will provide training on alternative medicine practices, such as acupuncture, herbal medicine, and massage therapy, as well as promoting healthy lifestyle habits such as exercise and healthy eating.
          3. Self-Defense Training: This program will provide basic self-defense techniques and strategies to help individuals feel more confident and secure in their daily lives.
          4. Medical and Dental Education: This program will provide education on basic medical and dental care, including first aid training and preventive care.
          5. Sports and Wellness Program: This program will encourage physical activity and healthy habits through various sports and wellness activities.
          6. Counseling Advice: This program will provide counseling services to individuals and families who need support in coping with mental health challenges.
          7. Nutrition and Family Planning (Teenage Pregnancy): This program will provide education on healthy nutrition and family planning, with a focus on preventing teenage pregnancy.
          8. Value Formation: This program will promote the development of positive values such as respect, responsibility, and compassion, to foster a healthy and supportive community.
          9. Feeding Program: The program is to improve the health and well-being of individuals and families by ensuring they have access to sufficient, nutritious food.
          Through these training and education programs, the "Community Health and Wellness: Empowering Families and Individuals" project aims to promote the physical, mental, and emotional well-being of community members and build a stronger, healthier, and more supportive community.""",
          target_date=start_date,
          location="Baclaran, San Isidro, Diezmo, Sala, Bigaa",
          partner_community="Baclaran, Bigaa, Diezmo, Sala, San Isidro",
          school=0,
          barangay=1,
          government_org="City Health Office",
          non_government_org="N/A",
          identified_needs_text="""1. Mental Readiness for Parents with Children with Special Needs: Equipping parents and caregivers with skills and knowledge to manage stress and promote mental wellness.
2. Alternative Medicine and Health Training: Providing education on alternative medicine practices like acupuncture and promoting healthy lifestyle habits.
3. Self-Defense Training: Teaching basic self-defense techniques and strategies for confidence and security.
4. Medical and Dental Education: Educating on basic medical and dental care, including first aid training and preventive care.
5. Sports and Wellness Program: Encouraging physical activity and healthy habits through sports and wellness activities.
6. Counseling Advice: Providing counseling services for mental health support.
7. Nutrition and Family Planning (Teenage Pregnancy): Educating on healthy nutrition and family planning with a focus on teenage pregnancy prevention.
8. Value Formation: Promoting the development of positive values to foster a supportive community.
9. Feeding Program: Ensuring health and well-being through access to sufficient nutritious food.""",
          general_objectives="""To improve the health and wellness of families and individuals in the community by providing training and education programs that promote physical, mental, and emotional well-being.""",
          specific_objectives="""1. To equip parents and caregivers of children with special needs with skills and knowledge to manage stress and promote mental wellness for themselves and their children.
          2. To provide education on alternative medicine practices and promote healthy lifestyle habits such as exercise and healthy eating.
          3. To provide basic self-defense techniques and strategies to help individuals feel more confident and secure in their daily lives.
          4. To provide education on basic medical and dental care, including first aid training and preventive care.
          5. To encourage physical activity and healthy habits through various sports and wellness activities.
          6. To provide counseling services to individuals and families who need support in coping with mental health challenges.
          7. To provide education on healthy nutrition and family planning, with a focus on preventing teenage pregnancy.
          8. To promote the development of positive values such as respect, responsibility, and compassion, to foster a healthy and supportive community.
          9. To provide feeding programs for children and families to ensure proper nutrition and promote overall health.""",
          success_indicators="""1. At least 50 parents and caregivers of children with special needs will complete the mental readiness training program by 2025.
          2. At least 100 participants will adopt healthy lifestyle habits after the alternative medicine and health training program by 2025.
          3. At least 50 participants will report feeling more confident and secure after the self-defense training program by 2025.
          4. At least 150 participants will regularly engage in physical activity after the sports and wellness program by 2025.
          5. At least 100 participants will complete the medical and dental education program and can perform basic first aid procedures by 2025.
          6. At least 50 individuals and families will receive counseling services and report improvement in their mental health by 2025.
          7. At least 100 participants will gain knowledge on healthy nutrition and family planning after attending the program by 2025.
          8. At least 200 community members will participate in values formation activities and report improvement in their attitudes and behaviors by 2025.
          9. At least 50 children and families will receive feeding programs and report improvement in their overall health by 2025.""",
          cooperating_agencies="""Brgy. Sala, Brgy. Bigaa, Brgy. Baclaran, Brgy. Diezmo, and Ba

Planning and Implementation: Barangays and PnC (UC) shall work together to plan and implement community extension programs. The barangay shall provide local knowledge and expertise about the community's needs, while the university can provide technical expertise and resources to support the program's implementation. Output: Needs Assessment and CES Plan 2023-2025

Resource Mobilization: Barangays and PnC (UC) shall work together to mobilize resources for community extension programs. The barangay can provide local resources such as manpower and facilities, while the university can provide technical resources to support the program.

Capacity Building: PnC (UC) can support the barangay's capacity building efforts by providing training and technical assistance. This can include training on project management, community organizing, and other relevant skills needed to implement successful community extension programs.

Resource requirements for community extension programs can vary depending on the nature and scope of the program. Some of the resources required include:
- Financial Resources: Community extension programs require funding to support program activities such as training, outreach, and resource mobilization. The barangay and PnC (UC) can work together to identify funding sources for the program.
- Human Resources: Community extension programs require a team of skilled and dedicated personnel to implement the program effectively. The barangay and PnC (UC) can work together to identify and train the required human resources needed for the program.
- Technical Resources: Community extension programs require access to technical resources such as research materials, data, and equipment. The university can provide access to these resources to support the program's implementation.""",
          monitoring_mechanics="""- Regular monitoring of program implementation: The program implementation will be monitored regularly to ensure that activities are carried out as planned and to identify any challenges or issues that need to be addressed. This will be done through regular meetings with program staff, partners, and stakeholders.
- Data collection: Relevant data will be collected to assess the impact of the program on individuals and the community. This includes quantitative data such as the number of participants in each program, their demographic information, and their feedback on the program's effectiveness. Qualitative data will also be collected through surveys and interviews to understand the participants' experience and identify areas for improvement.
- Data analysis: Data collected will be analyzed to assess the effectiveness of the program and identify areas for improvement. This will include analysis of quantitative data to determine whether the program targets and objectives have been met, as well as analysis of qualitative data to identify program strengths and areas for improvement.
- Regular reporting: Regular reporting on program progress will be done to keep stakeholders informed on the program's performance. Reports will be produced on a regular basis and shared with the barangay.
- Evaluation: A formal evaluation will be conducted at the end of the program to assess the program's overall impact and effectiveness. This will involve a review of program data and feedback from participants, staff, and stakeholders. The evaluation will also identify lessons learned and provide recommendations for future program improvements.
- Adjustments and improvements: Based on the evaluation findings, adjustments and improvements will be made to the program to ensure its continued effectiveness and relevance.""",
          evaluation_mechanics = """- Regular reporting: Regular reporting on program progress will be done to keep stakeholders informed on the program's performance. Reports will be produced on a regular basis and shared with the barangay.
- Evaluation: A formal evaluation will be conducted at the end of the program to assess the program's overall impact and effectiveness. This will involve a review of program data and feedback from participants, staff, and stakeholders. The evaluation will also identify lessons learned and provide recommendations for future program improvements.
- Adjustments and improvements: Based on the evaluation findings, adjustments and improvements will be made to the program to ensure its continued effectiveness and relevance.
""",
          timetable = """
1. May 2-July 31, 2023:
   - Define the target population
   - Determine the resources needed
   - Partner with other organizations or stakeholders to support the program
   - Develop the program plan
2. August 1-31, 2023:
   - Launching of all programs
   - Introduction to the community/target population
3. September 1-November 30, 2023:
   - Initial Phase Implementation of the program per identified needs
4. December 2023:
   - Outreach Program Implementation
   - Medical and Dental Mission Implementation
   - Initial Evaluation of the Program
5. January-June 2024:
   - Second Phase Implementation
   - Partial Evaluation of the Program
6. July-December 2024:
   - Third Phase Implementation (possible of another or additional set or number of target population if the second phase is successful)
   - Monitoring and Evaluation of the Program
   - Trainings of the community member as counselor, leader, etc.
   - Outreach Program Implementation
7. January-June 2025:
   - Fourth Phase Implementation (possible of another or additional set or number of target population if the third phase is successful)
   - Continues training of the community members
   - Monitoring and Evaluation of the Program
8. July-December 2025:
   - Fifth Phase Implementation
   - Consider the long-term sustainability of the program by developing strategies for ongoing funding and support
   - Supervise trained community members as first aid responders, counselors, etc.
   - Final Evaluation of the Program
   - Termination Phase
""",
          risk_assessment="""1. Lack of community participation.
          2. Lack of funding.
          3. Lack of qualified personnel.
          4. Resistance to change.
          5. Limited access to resources
          6. Change of leadership due to forthcoming election""",
          action_plans = """
1. Lack of community participation: The program should be designed with input from the community, and ongoing efforts should be made to ensure community engagement and participation.
2. Lack of funding: The program can explore partnerships with local government units, NGOs, and private organizations to secure additional funding and resources. The program can also conduct fundraising campaigns and seek donations from individuals or businesses.
3. Lack of qualified personnel: The program can provide incentives and professional development opportunities for its trainers to increase their motivation and job satisfaction. The program can also establish a mentorship program to support new trainers and ensure consistency in the delivery of the program's objectives.
4. Resistance to change: The program should have a robust community engagement strategy in place, which includes education and awareness-raising activities to address misconceptions and resistance to change.
5. Limited access to resources: The program should identify and address barriers to participation, such as providing transportation or offering remote program options.
6. Conduct stakeholder engagement and buy-in: Engage the new leadership in the planning and implementation of the project. This can help to build trust and understanding between the project team and the new leadership.
""",
          sustainability_approaches="""1. Community ownership and engagement: The program will be designed with input from the community and stakeholders. This ensures that the program meets the needs of the community and promotes community ownership and engagement, which can increase the program's sustainability.
2. Capacity building: The program will focus on building the capacity of the community and local organizations. This includes providing training and resources to empower individuals and organizations to continue the program's activities after the program ends.
3. Partnerships: The program will establish partnerships with local organizations, government agencies, and other stakeholders. This can help sustain the program's activities and ensure that the program is integrated into the local healthcare system.
4. Advocacy and awareness: The program should advocate for policies and practices that support community health and wellness. This includes raising awareness about health issues and advocating for policies and practices that promote community health and wellness.""",
         budget_requirement_text="""Feeding Program (50 target population):
- Php 50.00 per individual meal by 50 target population = Php 2,500.00/meal
  (Varies on the number of days, ideally 1000 days)
  = Php 2,500.00/meal/session

Education Program (Medical, Dental, Family Planning, Nutrition, and First Aid Procedures) (100 target population):
- Snacks for 100 target population (Php 50.00 by 100 target population)
  = Php 5,000.00 per session

Mental Health Program (50 target population):
- Snacks (Php 50.00 by 50 target population)
  = Php 2,500.00/session

Sports and Wellness Program (150 target population):
- Trainer’s/Coach Fee Php 3,000.00
- Snacks/Refreshment Php 7,500.00
  = Php 10,500.00/session

Alternative Medicine (100 target population):
- Trainer’s Fee/Professional Fee Php 5,000.00
- Snacks Php 5,000.00
  = Php 10,000.00/session

Values Formation and Counseling Program (250 target population):
- Resource Speaker Php 10,000.00
- Snacks Php 12,500.00
  = Php 22,500.00/session

Self Defense Training Program (50 target population):
- Trainer’s Fee/Coach Php 3,000.00
- Snacks/Refreshment Php 2,500.00
  = Php 5,500.00/session""",

          budget_requirement_file=None,
          directorSignDate='2023-05-02',
          VPRESignDate='2023-05-02',
          PRESignDate='2023-05-02',
          is_three_year_plan=True,
          is_one_year_plan=False,
          current_version_id=None,
          remarks=None,
          status="Approved by President"
      )

      # Add unique signatories
      Signatory.objects.create(proposal=proposal, name="Dr. Ma. Gloria G. Greganda", position="CES Coordinator", section="prepared")
      Signatory.objects.create(proposal=proposal, name="Isabelita N. Isip, Man RN", position="CES Coordinator", section="prepared")
      Signatory.objects.create(proposal=proposal, name="Dr. Jinky C. Malabanan", position="Dean", section="endorsed")
      Signatory.objects.create(proposal=proposal, name="Shalini S. Barroso, MAN RN", position="Dean", section="endorsed")
      Signatory.objects.create(proposal=proposal, name="Hon. Francisco Alimagno", position="Brgy. Captain", section="concurred")
      Signatory.objects.create(proposal=proposal, name="Hon. Nolasco Manimtim", position="Brgy. Captain", section="concurred")
      Signatory.objects.create(proposal=proposal, name="Hon. Richard Algire", position="Brgy. Captain", section="concurred")
      Signatory.objects.create(proposal=proposal, name="Hon. Mauro Galang", position="Brgy. Captain", section="concurred")
      Signatory.objects.create(proposal=proposal, name="Hon. Mario Servo", position="Brgy. Captain", section="concurred")



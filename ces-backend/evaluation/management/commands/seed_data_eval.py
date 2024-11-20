from django.core.management.base import BaseCommand
from django.utils import timezone
from evaluation.models import EvaluationType, Section, Question  # Import your models

class Command(BaseCommand):
    help = 'Seed the database with initial data'

    def handle(self, *args, **kwargs):
        # Clear existing data to avoid duplicates if needed
        EvaluationType.objects.all().delete()
        # Section.objects.all().delete()
        # Question.objects.all().delete()

       # Define the evaluation types to seed
        evaluation_types = [
            {"name": "After Activity Evaluation Form", "description": "Evaluation form to assess activities post-event"},
            {"name": "Community Connection Impact Evaluation Form", "description": "Evaluation form to assess the impact on community connections"},
        ]

        # Seed EvaluationType data
        for eval_type in evaluation_types:
            EvaluationType.objects.create(
                name=eval_type["name"],
                description=eval_type["description"],
                created_at=timezone.now(),
                updated_at=timezone.now(),
                created_by_id=1
            )

        #  # Define sections and their corresponding questions
        # sections = {
        #     "Objectives": [
        #         "Clarity of objectives",
        #         "Relevance of objectives",
        #         "Attainment of objectives",
        #     ],
        #     "Activities": [
        #         "Alignment with the objectives",
        #         "Extent to which they enrich participants",
        #     ],
        #     "Conduct of Activities": [],
        #     "Flow of the Program": [],
        #     "Time Management": [],
        #     "Appropriateness/Adequacy of Materials": [],
        #     "Venue and Facilities": [
        #         "Suitability",
        #         "Cleanliness",
        #     ],
        #     "Food": [],
        #     "Resource Person/Speaker (if any)": [
        #         "Competence and effectiveness",
        #         "Orderliness in presentation",
        #     ],
        #     "Organizing Team": [
        #         "Human relations",
        #         "Promptness in delivery of service",
        #     ],
        #     "Suggestion": [
        #         "Kindly write your suggestions for improvement"
        #     ]
        # }


        # for section_title, questions in sections.items():
          
        #     section = Section.objects.create(
        #         title=section_title,
        #         created_by_id=created_by_id,      
        #         evaluation_type_id=evaluation_type_id, 
        #         is_fixed=False,                 
        #         created_at=timezone.now(),        
        #         updated_at=timezone.now()      
        #     )

        #     # Loop through questions under the current section and create them
        #     for question_text in questions:
        #         # Define the question type based on section
        #         # Use "text" for Suggestion section, otherwise use "rating"
        #         question_type = "text" if section_title == "Suggestion" else "rating"

        #         # Create a Question object linked to the current section
        #         Question.objects.create(
        #             section=section,            # Set foreign key relationship to section
        #             text=question_text,         # The question text
        #             question_type=question_type, # Question type (rating or text)
        #             created_at=timezone.now(),  # Set created_at to the current time
        #             updated_at=timezone.now()   # Set updated_at to the current time
        #         )

        # # Print a success message when seeding is complete
        # self.stdout.write(self.style.SUCCESS("Sections and questions seeded successfully with created_by_id=1 and evaluation_type_id=1!"))

        # self.stdout.write(self.style.SUCCESS("Database seeded with evaluation types successfully"))

       
from django.db import models

class ImpactEvaluation(models.Model):
    # Fields for general information
    division_name = models.CharField(max_length=255, default="Unknown Division")
    activity_title = models.CharField(max_length=255, default="Untitled Activity")
    activity_date = models.DateField(null=True, blank=True)  # Allow null/blank for date if not provided
    venue = models.CharField(max_length=255, default="Unknown Venue")
    objectives = models.TextField(default="Objectives not provided.")

    # Questions 1-11 as CharFields with descriptive text and default values
    CHOICES_Q1 = [
        (3, 'Clearly defined and achieved'),
        (2, 'Partially'),
        (1, 'Not Achieved')
    ]
    CHOICES_Q2 = [
        (3, 'Very effectively'),
        (2, 'Moderately effectively'),
        (1, 'Ineffectively')
    ]
    CHOICES_Q3 = [
        (3, 'Excellently managed'),
        (2, 'Adequately managed'),
        (1, 'Poorly managed')
    ]
    CHOICES_Q4 = [
        (3, 'Excellent support and assistance'),
        (2, 'Adequate support and assistance'),
        (1, 'Insufficient support and assistance')
    ]
    CHOICES_Q5 = [
        (3, 'Highly fostered engagement'),
        (2, 'Moderately fostered engagement'),
        (1, 'Minimally fostered engagement')
    ]
    CHOICES_Q6 = [
        (3, 'Significantly promoted awareness'),
        (2, 'Partially promoted awareness'),
        (1, 'Did not promote awareness')
    ]
    CHOICES_Q7 = [
        (3, 'Strongly encouraged collaboration'),
        (2, 'Somewhat encouraged collaboration'),
        (1, 'Did not encourage collaboration')
    ]
    CHOICES_Q8 = [
        (3, 'Highly engaged and participative'),
        (2, 'Moderately engaged and participative'),
        (1, 'Low engagement and participation')
    ]
    CHOICES_Q9 = [
        (3, 'Significant positive impact'),
        (2, 'Some positive impact'),
        (1, 'No discernible impact')
    ]
    CHOICES_Q10 = [
        (3, 'Very likely'),
        (2, 'Somewhat likely'),
        (1, 'Unlikely')
    ]
    CHOICES_Q11 = [
        (3, 'Highly positive experience'),
        (2, 'Neutral experience'),
        (1, 'Negative experience')
    ]

    # Define questions as CharFields with choices and default values
    Q1 = models.CharField(max_length=50, choices=CHOICES_Q1, default='Clearly defined and achieved')
    Q2 = models.CharField(max_length=50, choices=CHOICES_Q2, default='Very effectively')
    Q3 = models.CharField(max_length=50, choices=CHOICES_Q3, default='Excellently managed')
    Q4 = models.CharField(max_length=50, choices=CHOICES_Q4, default='Excellent support and assistance')
    Q5 = models.CharField(max_length=50, choices=CHOICES_Q5, default='Highly fostered engagement')
    Q6 = models.CharField(max_length=50, choices=CHOICES_Q6, default='Significantly promoted awareness')
    Q7 = models.CharField(max_length=50, choices=CHOICES_Q7, default='Strongly encouraged collaboration')
    Q8 = models.CharField(max_length=50, choices=CHOICES_Q8, default='Highly engaged and participative')
    Q9 = models.CharField(max_length=50, choices=CHOICES_Q9, default='Significant positive impact')
    Q10 = models.CharField(max_length=50, choices=CHOICES_Q10, default='Very likely')
    Q11 = models.CharField(max_length=50, choices=CHOICES_Q11, default='Highly positive experience')
    Q12_recommendations = models.TextField(default="No recommendations provided.")

    def __str__(self):
        return f"{self.activity_title} - {self.division_name}"

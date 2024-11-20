from django.shortcuts import render
from django.db.models import Avg, Count
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ImpactEvaluation
from api.models import ActivitySchedule
from .serializer import ImpactEvaluationSerializer

from django.shortcuts import get_object_or_404

class ImpactEvaluationListCreateView(generics.ListCreateAPIView):
    queryset = ImpactEvaluation.objects.all()
    serializer_class = ImpactEvaluationSerializer

# Retrieve, Update, and Delete View
class ImpactEvaluationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ImpactEvaluation.objects.all()
    serializer_class = ImpactEvaluationSerializer
    
# Helper function to get descriptive paragraph
def get_assessment_paragraph(average, question_number):
    if average is None:
        return "No feedback data is available for this question."

    if question_number == 1:
        if 1.00 <= average <= 1.99:
            return "The activity's primary goal or objective was not clearly defined or achieved. Participants felt the purpose was not met, indicating a need for more focused planning and execution."
        elif 2.00 <= average <= 2.49:
            return "The activity’s primary goal or objective was partially achieved. While some progress was made, there is room for clearer definition and more targeted efforts to fully accomplish the intended outcomes."
        elif 2.50 <= average <= 3.00:
            return "The activity’s primary goal or objective was clearly defined and successfully achieved. Participants felt that the activity effectively met its purpose, demonstrating strong planning and execution."

    elif question_number == 2:
        if 1.00 <= average <= 1.99:
            return "The activity was perceived as ineffective in addressing the needs of the target community. The feedback highlights significant areas for improvement to better serve and impact the community."
        elif 2.00 <= average <= 2.49:
            return "The activity was moderately effective in addressing the needs of the target community. While it made a positive contribution, additional adjustments are needed to ensure more impactful outcomes."
        elif 2.50 <= average <= 3.00:
            return "The activity was very effective in addressing the needs of the target community. Participants felt it made a significant difference, reflecting well-aligned goals and a thoughtful approach."

    elif question_number == 3:
        if 1.00 <= average <= 1.99:
            return "The logistics and organization of the activity were poorly managed. Participants experienced disruptions or inefficiencies, suggesting a need for better planning and resource allocation."
        elif 2.00 <= average <= 2.49:
            return "The logistics and organization were adequately managed, with some room for improvement. While the event ran smoothly in parts, certain aspects could be refined for a more seamless experience."
        elif 2.50 <= average <= 3.00:
            return "The logistics and organization were excellently managed. Participants found the event well-coordinated, with clear communication and efficient execution throughout."

    elif question_number == 4:
        if 1.00 <= average <= 1.99:
            return "The support and assistance provided to participants were insufficient. Many felt that more guidance and resources were needed to enhance their experience and engagement."
        elif 2.00 <= average <= 2.49:
            return "The support and assistance were adequate but left room for improvement. While some participants felt supported, others indicated a need for more proactive and comprehensive assistance."
        elif 2.50 <= average <= 3.00:
            return "The support and assistance provided were excellent. Participants felt well-supported and appreciated the attentive and responsive nature of the organizers."

    elif question_number == 5:
        if 1.00 <= average <= 1.99:
            return "The activity minimally fostered engagement and interaction with community members. Participants noted a lack of meaningful connections, which limited the overall impact."
        elif 2.00 <= average <= 2.49:
            return "The activity moderately fostered engagement, creating some opportunities for interaction. However, there is potential for more intentional and impactful community involvement."
        elif 2.50 <= average <= 3.00:
            return "The activity highly fostered meaningful engagement with community members. Participants felt a strong sense of connection, which greatly contributed to the success of the event."

    elif question_number == 6:
        if 1.00 <= average <= 1.99:
            return "The activity did not significantly promote awareness or understanding of relevant issues. Participants felt that important messages were lost or underemphasized."
        elif 2.00 <= average <= 2.49:
            return "The activity partially promoted awareness, raising some understanding of the issues. However, there is room for more impactful messaging and educational efforts."
        elif 2.50 <= average <= 3.00:
            return "The activity significantly promoted awareness and understanding of relevant issues. Participants left with a deeper appreciation of the topics discussed, reflecting the event's educational success."

    elif question_number == 7:
        if 1.00 <= average <= 1.99:
            return "The activity did not encourage collaboration and cooperation among participants. Many felt that opportunities for teamwork and partnership were missed."
        elif 2.00 <= average <= 2.49:
            return "The activity somewhat encouraged collaboration, with participants experiencing some teamwork but feeling that stronger collaborative efforts could have been fostered."
        elif 2.50 <= average <= 3.00:
            return "The activity strongly encouraged collaboration and cooperation. Participants engaged meaningfully with one another, creating a sense of unity and shared purpose."

    elif question_number == 8:
        if 1.00 <= average <= 1.99:
            return "Community members showed low engagement and participation. The event struggled to capture interest, indicating a need for more engaging and inclusive approaches."
        elif 2.00 <= average <= 2.49:
            return "The level of engagement and participation was moderate. While some members were actively involved, there is an opportunity to better captivate and engage the community."
        elif 2.50 <= average <= 3.00:
            return "Community members were highly engaged and participative. The event successfully captured interest and involvement, creating a vibrant and interactive experience."

    elif question_number == 9:
        if 1.00 <= average <= 1.99:
            return "The activity had no discernible impact on the community and its members. Participants felt that the event did not make a meaningful difference, warranting a reevaluation of objectives."
        elif 2.00 <= average <= 2.49:
            return "The activity had some positive impact, though it was not transformative. There is potential to enhance the impact through more targeted and meaningful initiatives."
        elif 2.50 <= average <= 3.00:
            return "The activity had a significant positive impact on the community. Participants noticed meaningful improvements, underscoring the event’s effectiveness and relevance."

    elif question_number == 10:
        if 1.00 <= average <= 1.99:
            return "Participants are unlikely to engage in similar activities in the future. The event did not leave a lasting impression, suggesting the need for more engaging and impactful programming."
        elif 2.00 <= average <= 2.49:
            return "Participants are somewhat likely to participate in similar activities. While there was interest, the event could be improved to boost future participation rates."
        elif 2.50 <= average <= 3.00:
            return "Participants are very likely to engage in similar activities in the future. The positive experience created excitement and a willingness to be involved again."

    elif question_number == 11:
        if 1.00 <= average <= 1.99:
            return "The overall experience was negative. Participants were dissatisfied and felt that the event fell short of their expectations, highlighting areas for major improvement."
        elif 2.00 <= average <= 2.49:
            return "The overall experience was neutral. Participants found some value but were not entirely impressed, suggesting the need for a more engaging and fulfilling experience."
        elif 2.50 <= average <= 3.00:
            return "The overall experience was highly positive. Participants enjoyed the event and felt it met or exceeded their expectations, making it a memorable and successful activity."

    return "Invalid score received, which may indicate an error in the data."

class ImpactEvaluationSummaryView(APIView):
    def get(self, request):
        activity_id = request.query_params.get('activity_id', None)
        question_number = request.query_params.get('question_number', None)
        all_activities = request.query_params.get('all_activities', None)

        # If fetching averages across all activities
        if all_activities and all_activities.lower() == 'true':
            if question_number is None:
                return Response({"error": "Please provide a question number for all activities summary."}, status=400)

            try:
                question_number = int(question_number)
            except ValueError:
                return Response({"error": "Question number must be an integer."}, status=400)

            if question_number < 1 or question_number > 11:
                return Response({"error": "Question number must be between 1 and 11."}, status=400)

            # Calculate the average for the specified question across all activities
            average_field = f"Q{question_number}"
            average = ImpactEvaluation.objects.aggregate(Avg(average_field))[f"{average_field}__avg"]

            # Get the assessment paragraph for the specified question number
            assessment_paragraph = get_assessment_paragraph(average, question_number)

            return Response({
                f"Q{question_number}_average_all_activities": average,
                "assessment_paragraph": assessment_paragraph
            })

        # If fetching for a specific activity and question
        if activity_id is None:
            return Response({"error": "Please provide an activity ID or specify `all_activities=true`."}, status=400)

        if question_number is None:
            return Response({"error": "Please provide a question number."}, status=400)

        try:
            activity_id = int(activity_id)
        except ValueError:
            return Response({"error": "Activity ID must be an integer."}, status=400)

        try:
            question_number = int(question_number)
        except ValueError:
            return Response({"error": "Question number must be an integer."}, status=400)

        if question_number < 1 or question_number > 11:
            return Response({"error": "Question number must be between 1 and 11."}, status=400)

        # Get the specific ActivitySchedule
        activity = get_object_or_404(ActivitySchedule, id=activity_id)

        # Filter ImpactEvaluation objects related to the activity
        data = ImpactEvaluation.objects.filter(activity_schedule=activity)

        # Calculate the average for the specified question
        average_field = f"Q{question_number}"
        average = data.aggregate(Avg(average_field))[f"{average_field}__avg"]

        # Get the assessment paragraph for the specified question number
        assessment_paragraph = get_assessment_paragraph(average, question_number)

        return Response({
            "activity_title": activity.activity_title,
            f"Q{question_number}_average": average,
            "assessment_paragraph": assessment_paragraph
        })

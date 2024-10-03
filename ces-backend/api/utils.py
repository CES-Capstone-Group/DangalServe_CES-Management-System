from docx import Document
from django.conf import settings
import os

def replace_text_in_paragraph(paragraph, placeholders):
    """Replaces placeholders in a given paragraph with actual values."""
    for key, value in placeholders.items():
        if key in paragraph.text:
            paragraph.text = paragraph.text.replace(key, value or '')

def replace_text_in_table(table, placeholders):
    """Replaces placeholders in all cells of a table."""
    for row in table.rows:
        for cell in row.cells:
            for paragraph in cell.paragraphs:
                replace_text_in_paragraph(paragraph, placeholders)

def generate_proposal_doc(proposal):
    # Path to your Word document template
    template_path = os.path.join(settings.BASE_DIR, 'Document Formats', 'PNC-PRE-FO-34-Community-and-Extension-Service-Activity-Proposal.docx')
    
    # Load the document template
    doc = Document(template_path)
    
    # Convert partner_community to a displayable format as a list (not individual barangays)
    partner_communities_display = ', '.join([community.strip() for community in proposal.partner_community.split(',')]) if proposal.partner_community else 'N/A'

    # Prepare placeholders and their replacements
    placeholders = {
        '{{title}}': proposal.title,
        '{{engagement_date}}': str(proposal.engagement_date) if proposal.engagement_date else '',
        '{{disengagement_date}}': str(proposal.disengagement_date) if proposal.disengagement_date else '',
        '{{department_organization}}': proposal.department,
        '{{lead_proponent}}': proposal.lead_proponent,
        '{{contact_details}}': proposal.contact_details,
        '{{project_description}}': proposal.project_description,
        '{{target_date}}': str(proposal.target_date) if proposal.target_date else '',
        '{{location}}': proposal.location,
        '{{school}}': '☑' if proposal.school else '☐',
        '{{barangay}}': '☑' if proposal.barangay else '☐',
        '{{gov_org}}': f"{proposal.government_org}" if proposal.government_org else '_____________',
        '{{non_gov_org}}': f"{proposal.non_government_org}" if proposal.non_government_org else '_____________',
        '{{gov_org_box}}': '☑' if proposal.government_org else '☐',
        '{{non_gov_box}}': '☑' if proposal.non_government_org else '☐',
        '{{partner_community}}': proposal.partner_community,
        '{{gen_objs}}': proposal.general_objectives,
        '{{spec_objs}}': proposal.specific_objectives,
        '{{success_indicators}}': proposal.success_indicators,
        '{{cooperating_agencies}}': proposal.cooperating_agencies,
        '{{monitoring_mech}}': proposal.monitoring_mechanics,
        '{{evaluation_mech}}': proposal.evaluation_mechanics,
        '{{timetable}}': proposal.timetable,
        '{{risk_assessment}}': proposal.risk_assessment,
        '{{action_plans_to_address_risks}}': proposal.action_plans,
        '{{sustainability_approaches}}': proposal.sustainability_approaches,
        '{{prepared_by}}': proposal.lead_proponent,
        '{{director_sign_date}}': str(proposal.directorSignDate) if proposal.directorSignDate else '_____________',
        '{{VPRE_sign_date}}': str(proposal.VPRESignDate) if proposal.VPRESignDate else '_____________',
        '{{PRE_sign_date}}': str(proposal.PRESignDate) if proposal.PRESignDate else '_____________'
    }

    # Handle signatures and display the name of all persons who sign the proposal
    partner_signatures = ''
    for barangay_approval in proposal.barangay_approvals.filter(status='Approved'):
        partner_signatures += f"{barangay_approval.barangay_name} - Signed by {barangay_approval.remarks or 'N/A'} on {barangay_approval.sign_date}\n"
    
    # Include the list of signers in the placeholders
    placeholders['{{partner_signatures}}'] = partner_signatures or '_____________'

    # Replace placeholders in all paragraphs
    for paragraph in doc.paragraphs:
        replace_text_in_paragraph(paragraph, placeholders)

    # Replace placeholders in tables
    for table in doc.tables:
        replace_text_in_table(table, placeholders)

    # Save the generated document
    output_dir = os.path.join(settings.MEDIA_ROOT, 'generated_proposals')
    os.makedirs(output_dir, exist_ok=True)

    output_path = os.path.join(output_dir, f'proposal_{proposal.proposal_id}.docx')
    doc.save(output_path)
    
    return output_path

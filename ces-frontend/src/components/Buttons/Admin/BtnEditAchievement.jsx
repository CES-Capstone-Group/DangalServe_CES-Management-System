import React, { useState, useEffect } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";

const BtnEditAchievement = ({ show, onHide, achievement, onAchievementUpdated }) => {
    const [awardTitle, setAwardTitle] = useState("");
    const [awardee, setAwardee] = useState("");
    const [awardedBy, setAwardedBy] = useState("");
    const [dateAwarded, setDateAwarded] = useState("");
    const [image, setImage] = useState(null);
    
    // Pre-fill data when modal opens
    useEffect(() => {
        if (achievement) {
            setAwardTitle(achievement.award_title);
            setAwardee(achievement.awardee);
            setAwardedBy(achievement.awarded_by);
            setDateAwarded(achievement.date_awarded);
        }
    }, [achievement]);

    const updateAchievement = async (e) => {
        e.preventDefault();

        const achievementData = new FormData();
        achievementData.append("award_title", awardTitle);
        achievementData.append("awardee", awardee);
        achievementData.append("awarded_by", awardedBy);
        achievementData.append("date_awarded", dateAwarded);
        
        if (image) {
            achievementData.append("image", image);
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/achievements/${achievement.id}/`, {
                method: "PUT", // for updating
                body: achievementData,
            });

            if (response.ok) {
                onAchievementUpdated();  // Trigger the callback to reload achievements
                onHide();                // Close the modal
                alert("Achievement updated successfully!");
            } else {
                alert("There was an error updating the achievement.");
            }
        } catch (error) {
            alert("There was an error updating the achievement.");
        }
    };

    return (
        <Modal backdrop='static' centered size="lg" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Achievement</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={updateAchievement}>
                    <Form.Group className='mb-3' controlId='AwardTitle'>
                        <Form.Label className='h5'>Award Title</Form.Label>
                        <InputGroup>
                            <Form.Control 
                                type='text' 
                                value={awardTitle}
                                onChange={(e) => setAwardTitle(e.target.value)}
                                required
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='Awardee'>
                        <Form.Label className='h5'>Awardee</Form.Label>
                        <InputGroup>
                            <Form.Control 
                                type='text' 
                                value={awardee}
                                onChange={(e) => setAwardee(e.target.value)}
                                required
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='AwardedBy'>
                        <Form.Label className='h5'>Awarded By</Form.Label>
                        <InputGroup>
                            <Form.Control 
                                type='text' 
                                value={awardedBy}
                                onChange={(e) => setAwardedBy(e.target.value)}
                                required
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='DateAwarded'>
                        <Form.Label className='h5'>Date Awarded</Form.Label>
                        <InputGroup>
                            <Form.Control 
                                type='date' 
                                value={dateAwarded}
                                onChange={(e) => setDateAwarded(e.target.value)}
                                required
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='AchvImage'>
                        <Form.Label className='h5'>Upload your Image (Optional)</Form.Label>
                        <InputGroup>
                            <Form.Control 
                                className="inputFile" 
                                type="file" 
                                onChange={(e) => setImage(e.target.files[0])} 
                                accept="image/*"
                            />
                        </InputGroup>
                        <p className="text-sm">Max Size: 25MB</p>
                    </Form.Group>

                    <Modal.Footer className="d-flex justify-content-center">
                        <Button size="lg" variant='success' type="submit">
                            Save Changes
                        </Button>
                        <Button size="lg" variant="danger" onClick={onHide}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default BtnEditAchievement;

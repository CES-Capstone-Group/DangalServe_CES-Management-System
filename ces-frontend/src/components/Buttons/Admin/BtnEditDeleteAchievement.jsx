import React, { useState, useEffect } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";

const BtnEditDeleteAchievement = ({ achievement, onAchievementUpdated }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
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

    // **Update Achievement Functionality**
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
                method: "PUT",  // PUT for updating
                body: achievementData,
            });

            if (response.ok) {
                onAchievementUpdated();  // Trigger the callback to reload achievements
                setShowEdit(false);       // Close the edit modal
                alert("Achievement updated successfully!");
            } else {
                alert("There was an error updating the achievement.");
            }
        } catch (error) {
            alert("There was an error updating the achievement.");
        }
    };

    // **Delete Achievement Functionality**
    const deleteAchievement = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/achievements/${achievement.id}/`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Achievement deleted successfully!");
                setShowDeleteConfirm(false);  // Close delete confirmation modal
                onAchievementUpdated();  // Trigger the callback to reload achievements
            } else {
                alert("There was an error deleting the achievement.");
            }
        } catch (error) {
            alert("There was an error deleting the achievement.");
        }
    };

    return (
        <>
            {/* Edit and Delete Buttons */}
            <Button className="shadow" onClick={() => setShowEdit(true)} style={{ backgroundColor: "#71a872", border: '0px', color: 'white', margin: '15px', fontSize: '20px' }}>
                Edit
            </Button>
            <Button className="shadow" onClick={() => setShowDeleteConfirm(true)} style={{ backgroundColor: "#ff3232", border: '0px', color: 'white', fontSize: '20px' }}>
                Delete
            </Button>

            {/* Edit Achievement Modal */}
            <Modal backdrop='static' centered size="lg" show={showEdit} onHide={() => setShowEdit(false)}>
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
                            <Button size="lg" variant="danger" onClick={() => setShowEdit(false)}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal size="m" centered show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this achievement?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={deleteAchievement} variant="danger"> {/* Delete Confirmation Button */}
                        Yes, Delete
                    </Button>
                    <Button onClick={() => setShowDeleteConfirm(false)} variant="secondary">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BtnEditDeleteAchievement;

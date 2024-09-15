import React, { useState } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";

const BtnAddAchievement = ({ onAchievementAdded }) => {
    const [showModal, setShowModal] = useState(false);
    const [awardTitle, setAwardTitle] = useState("");
    const [awardee, setAwardee] = useState("");
    const [awardedBy, setAwardedBy] = useState("");
    const [dateAwarded, setDateAwarded] = useState("");
    const [image, setImage] = useState(null);

    const handleShowModal = () => setShowModal(true);

    const handleCloseModal = () => {
        // Reset all form fields to their default values
        setAwardTitle("");
        setAwardee("");
        setAwardedBy("");
        setDateAwarded("");
        setImage(null);

        // Close the modal
        setShowModal(false);
    };

    const addAchievement = async (e) => {
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
            const response = await fetch("http://127.0.0.1:8000/api/achievements/create/", {
                method: "POST",
                body: achievementData,
            });

            if (response.ok) {
                // Trigger the callback to reload achievements
                onAchievementAdded();

                // Close the modal
                handleCloseModal();

                alert("Achievement added successfully!");
            } else {
                alert("There was an error adding the achievement.");
            }
        } catch (error) {
            alert("There was an error adding the achievement.");
        }
    };

    return (
        <div className="d-flex justify-content-end m-3">
            <div>
                <Button style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }} onClick={handleShowModal}>
                    + Add Achievement
                </Button>
            </div>

            <Modal backdrop='static' centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> Add New Achievement </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addAchievement}>
                        <Form.Group className='mb-3' controlId='AwardTitle'>
                            <Form.Label className='h5'>Award Title</Form.Label>
                            <InputGroup>
                                <Form.Control 
                                    className='input' 
                                    type='text' 
                                    placeholder='' 
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
                                    className='input' 
                                    type='text' 
                                    placeholder='' 
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
                                    className='input' 
                                    type='text' 
                                    placeholder='' 
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
                                    className='input' 
                                    type='date' 
                                    placeholder='' 
                                    value={dateAwarded}
                                    onChange={(e) => setDateAwarded(e.target.value)}
                                    required
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='AchvImage'>
                            <Form.Label className='h5'>Upload your Image</Form.Label>
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
                                Add
                            </Button>
                            <Button size="lg" variant="danger" onClick={handleCloseModal}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default BtnAddAchievement;

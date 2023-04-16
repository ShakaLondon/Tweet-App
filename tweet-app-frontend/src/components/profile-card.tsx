import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Container } from "react-bootstrap";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { ProfileProps } from "src/types/app-state";

const ProfileCard = ({ profileUser }: ProfileProps) => {
console.log(profileUser)
    
  const getDateString = (date: number | undefined) => {
    if (date) {
      const dateObject = new Date(date)
      console.log(dateObject)
      const month: string = dateObject.toLocaleString("en-US", {month: "long"})
      const year: string = dateObject.toLocaleString("en-US", {year: "numeric"})
      const output: string = `${month} ${year}`
      return output
    }
  };
  
  return (
    <Card className="px-0 py-0 d-flex" id="profile-card">
      <Card.Body className="px-0 py-0">
        <Card.Img className="card-img-top no-border-radius" id="header-image" src="https://picsum.photos/500/200"/>
        <Card.Img className="rounded-circle" id="profile-image" src="https://picsum.photos/100/100"/>
        <Container fluid className="py-0 profile-card-padding" id="profile-name-container">
        <Card.Title className="profile-title">{`${profileUser? profileUser.firstName : ""} ${profileUser? profileUser?.lastName : ""}`}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{`@${profileUser? profileUser?.loginID : ""}`}</Card.Subtitle>
        </Container>
        <Container fluid id="profile-card-info" className="py-0 profile-card-padding">
          <Card.Subtitle className="mb-2 text-muted">
          <FontAwesomeIcon icon={faCalendarAlt} />
          {` Joined ${getDateString(profileUser?.createdAt)}`}
          </Card.Subtitle>
          </Container>
          <Container fluid id="follow-card-info" className="py-0 profile-card-padding d-flex">
          <Card.Subtitle className="mt-2 text-muted pr-3">
          {`0 Following`}
          </Card.Subtitle>
          <Card.Subtitle className="mt-2 text-muted px-3">
          {`0 Followers`}
          </Card.Subtitle>
          </Container>
      </Card.Body>
    </Card>
  )
};

export default ProfileCard;
import React from "react";
import { Button, Card, Image } from "semantic-ui-react";

const CardExampleGroups = () => (
    <Card.Group>
    {this.state.requestList.map(request => (
		<Card key={request.eventId}>
			<Card.Content>
				<Image
					floated="right"
					size="mini"
					src="/asset/pledge.jpg"
				/>
				<Card.Header>{request.requestDescription}</Card.Header>
                <Card.Meta>{request.requestStartdate}</Card.Meta>
                <Card.Meta>{request.requestEnddate}</Card.Meta>
				<Card.Description>
                <div>{request.status ? <strong>'Urgently Needed'</strong> : <strong>'Completed'</strong>}</div>
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<div className="ui two buttons">
					<Button basic color="green">
						Approve
					</Button>
					<Button basic color="red">
						Decline
					</Button>
				</div>
			</Card.Content>
        </Card>
        ))}
    </Card.Group>
    
);

export default CardExampleGroups;

import React from "react"
import {Card, Spin, Row, Col, Tag, Button} from "antd"

import "./MemeCard.css"

export const MemeCard = ({memes, next, back, getNextMemes}) => {

    function truncateString(str, num) {
        if (str.length > num) {
          return str.slice(0, num) + "...";
        } else {
          return str;
        }
    }

    return(
        <div className="container">
            {!memes ? (
                <div className="spinner">
                    <Spin size={"large"}/>
                </div>
            ): (
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    {memes.map((meme, index) => {
                        const tags = meme.tags.split(",")
                        return(
                            <Col key={index} className="gutter-row" span={6}>
                                <Card
                                    hoverable
                                    className="card"
                                    cover={
                                    <img onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src = require("../assets/defaultMeme.jpg");
                                      }} 
                                      className="card-cover" 
                                      alt="example" 
                                      height={200} 
                                      src={meme.image ? meme.image : require("../assets/defaultMeme.jpg")} />
                                    }
                                >
                                    <Tag color="#ff9c9f" className="card-tag" key={index}>{truncateString(tags[0], 15)}</Tag>
                                    <h3>{truncateString(meme.name, 15)}</h3>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            )}
            <div className="pagination">
                <Button disabled={back ? false: true} onClick={() => getNextMemes(back)}>Back</Button>
                <Button disabled={next ? false: true} onClick={() => getNextMemes(next)}>Next</Button>
            </div>
        </div>
    )
}
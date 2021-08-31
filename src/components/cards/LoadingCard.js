import React from 'react'
import { Card,Skeleton,Avatar } from 'antd';
const { Meta } = Card;


const LoadingCard = ({count}) => {
    const cards=()=>{
        let totalCards=[]
        for (let i = 0; i < count; i++) {
            totalCards.push(<Card className="col m-3" key={i}>
                <Skeleton avatar active>
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title="Card title"
              description="This is the description"
            />
          </Skeleton>
            </Card>)
            
        }
        return totalCards
    }
    return (
        <div className="row pd-5">
            {cards()}
        </div>
    )
}

export default LoadingCard

import React from 'react'
import { Card } from 'antd';
import defaultImage from '../../images/defaultimageproduct.png'
import {EditOutlined,DeleteOutlined}from '@ant-design/icons'
import {Link} from 'react-router-dom'
const { Meta } = Card;

const AdminProductCard = ({ product,handleRemove }) => {
    //destructure
    const { title, description, price, images ,slug} = product
    return (
        <Card
            hoverable
            // style={{ width: 240 }}
            cover={<img 
                src={images&&images.length?images[0].url:defaultImage} 
                style={{height:'150px',objectFit:"cover"}}
                className="p-1"
            />}
            actions={[
                <Link to={`/admin/product/${slug}`}><EditOutlined className="text-warning"/></Link>,
                <DeleteOutlined onClick={()=>handleRemove(slug)} className="text-danger"/>
            ]}
        >
            <Meta title={title} description={`${description&&description.substring(0,40)}...`} />

        </Card>
    )
}

export default AdminProductCard

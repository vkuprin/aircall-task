import {
  Avatar, Card, Col, Row, Switch,
} from 'antd';

import { useEffect, useState } from 'react';
import BgProfile from '../../assets/images/bg-signup.jpg';
import profilavatar from '../../assets/images/profile_avatar.png';
import CallsService from '../../services/CallsService';

const ProfilePage = () => {
  const [specificData, setSpecificData] = useState<Record<string, any>>({});

  useEffect(() => {
    CallsService.myself().then((res) => {
      setSpecificData(res);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: `url(${BgProfile})` }}
      />

      <Card
        className="card-profile-head"
        bodyStyle={{ display: 'none' }}
        title={(
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={profilavatar} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{specificData.id}</h4>
                  <p>{specificData.username}</p>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
            )}
      />

      <Row gutter={[24, 0]}>
        <Col span={24} md={12} className="mb-24 ">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Notification Settings</h6>}
          >
            <ul className="list settings-list">
              <li>
                <h6 className="list-header text-sm text-muted">ACCOUNT</h6>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Email me when someone changes product</span>
              </li>
              <li>
                <Switch />
                <span>Email me when someone adds product</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Email me when someone deletes product</span>
              </li>
              <li>
                <h6 className="list-header text-sm text-muted m-0">
                  ANALYTICS
                </h6>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Track when I logged in</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Track each product updates</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Users count monthly update</span>
              </li>
            </ul>
          </Card>
        </Col>
        <Col span={24} md={12} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Profile Information</h6>}
            className="header-solid h-full card-profile-information"
            // extra={<EditModal data={descriptions} id={ID} />}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <p className="text-dark">
              You should hire me because I will make your life easier.
            </p>
            <hr className="my-25" />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;

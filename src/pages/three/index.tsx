import React from 'react';
import { Card, Row, Col, Modal } from 'antd';
import styles from './index.less';

function ThreePlayground() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('A');

  function showDemo(title: string) {
    setOpen(true);
    setTitle(title);
  }

  function closeModal() {
    setOpen(false);
  }

  const demoList = [
    {
      name: 'basic',
      title: 'Basic',
    },
    {
      name: 'advanced',
      title: 'Advanced',
    },
    {
      name: 'basic1',
      title: 'Basic1',
    },
    {
      name: 'advanced2',
      title: 'Advanced2',
    },
  ];
  return (
    <Row gutter={[16, 16]} className={styles.threeHomepage}>
      {demoList.map((item) => {
        const { name, title } = item;
        return (
          <Col
            key={name}
            xs={12}
            sm={8}
            md={6}
            lg={6}
            xl={6}
            xxl={4}
            onClick={() => {
              showDemo(title);
            }}
          >
            <Card title={name} hoverable>
              {title}
            </Card>
          </Col>
        );
      })}

      <Modal
        width={'100%'}
        title={title}
        open={open}
        onCancel={closeModal}
        footer={null}
        className={styles.modalStyle}
      >
        sls
      </Modal>
    </Row>
  );
}

export default ThreePlayground;

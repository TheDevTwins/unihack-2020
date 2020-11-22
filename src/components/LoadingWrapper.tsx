import React from 'react';

import { Spin, Row, Col } from 'antd';

type Props = {
  overwriteScreen?: boolean;
  loading: boolean;
};

const LoadingWrapper: React.FC<Props> = ({ loading, children, overwriteScreen }) => {
  if (loading) {
    if (overwriteScreen)
      return (
        <Row justify="center" align="middle" style={{ height: '100vh' }}>
          <Col>
            <Spin size="large" />
          </Col>
        </Row>
      );

    return <Spin size="large">{children}</Spin>;
  }

  return <>{children}</>;
};

export default LoadingWrapper;

import React from 'react';
import { Course } from 'contexts';
import { Link } from 'react-router-dom';
import { Button, List } from 'antd';

import { Metadata } from 'contexts';
import {
  BarChartOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  PlusCircleOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons/lib';

type Props = {
  dataSource: Metadata[];
  cardName?: string; // this is used to display the text for the create new button
  editUrl?: (id: string) => string;
  enterUrl?: (id: string) => string;
  onCreate?: () => void;
  createUrl?: string;
  onDelete?: (id: string) => void;
  onBuy?: (id: string) => void;
};

const CardList: React.FC<Props> = ({
  dataSource,
  onDelete,
  onCreate,
  createUrl,
  cardName,
  editUrl,
  enterUrl,
  onBuy,
}) => {
  const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

  const makeCard = (item: Course) => {
    return (
      <div className="card">
        <div
          style={{ backgroundImage: 'url(' + item.thumbnailUrl + ')' }}
          className="card__image"
        />
        <div className="card__content">
          <div className="card__tags">{item.tags?.join(' - ')}</div>
          <div className="card__title">{item.title}</div>
          <div className="card__stats">
            <div className="card__stat">
              <BarChartOutlined />
              {DIFFICULTIES[item.difficulty]}
            </div>
            <div className="card__stat">
              <ClockCircleOutlined />
              {item.duration}
            </div>
          </div>
          <div className="card__description">{item.description}</div>
          {enterUrl && (
            <Button type="primary">
              <Link to={enterUrl(item.id)}>Enter {cardName}</Link>
            </Button>
          )}
        </div>
        <div className="card__actions">
          {editUrl && (
            <Link className="card__edit" to={editUrl(item.id)}>
              <EditOutlined />
            </Link>
          )}
          {onDelete && (
            <div
              className="card__delete"
              onClick={() => {
                onDelete(item.id);
              }}
            >
              <CloseCircleOutlined />
            </div>
          )}
          {onBuy && (
            <div
              className="card__buy"
              onClick={() => {
                onBuy(item.id);
              }}
            >
              <ShoppingCartOutlined />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="wrapper">
      {onCreate && (
        <div className="row row--align u-flex">
          <div
            className="createBtn"
            onClick={() => {
              onCreate();
            }}
          >
            Create new {cardName} <PlusCircleOutlined className="createBtn__icon" />
          </div>
        </div>
      )}
      {createUrl && (
        <div className="row row--align u-flex">
          <Link className="createBtn" to={createUrl}>
            Create new {cardName} <PlusCircleOutlined className="createBtn__icon" />
          </Link>
        </div>
      )}

      <div className="row">
        <List
          itemLayout="vertical"
          size="large"
          dataSource={dataSource}
          renderItem={(item, i) => <List.Item key={i}> {makeCard(item)} </List.Item>}
        />
      </div>
    </div>
  );
};

export default CardList;

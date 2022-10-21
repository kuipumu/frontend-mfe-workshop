import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Row, Col, TextFilter, DataTable, CardView, Card,
} from '@edx/paragon';

import { fetchCourses } from './data';

const CourseCard = ({ className, original }) => {
  const {
    id, name, org, start, end, media,
  } = original;

  return (
    <Card className={className}>
      <Card.ImageCap src={media.image.small} srcAlt="Course image" />
      <Card.Header
        title={name}
        subtitle={org}
      />
      <Card.Section>
        <ul>
          <li>ID: {id}</li>
          <li>Start Date: {start}</li>
          <li>End Date: {end}</li>
        </ul>
      </Card.Section>
    </Card>
  );
};

const CoursesTable = ({ data }) => {
  const [currentView, setCurrentView] = useState('card');
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Organization',
      accessor: 'org',
    },
    {
      Header: 'Course Name',
      accessor: 'name',
    },
    {
      Header: 'Start Date',
      accessor: 'start',
    },
    {
      Header: 'End Date',
      accessor: 'end',
    },
  ];

  return (
    <DataTable
      itemCount={data.length}
      data={data}
      columns={columns}
      isSortable
      isFilterable
      defaultColumnValues={{ Filter: TextFilter }}
      dataViewToggleOptions={{
        isDataViewToggleEnabled: true,
        onDataViewToggle: val => setCurrentView(val),
        defaultActiveStateValue: 'card',
      }}
    >
      <DataTable.TableControlBar />
      { currentView === 'list' && <DataTable.Table /> }
      { currentView === 'card' && <CardView CardComponent={CourseCard} /> }
      <DataTable.EmptyTable content="No results found." />
      <DataTable.TableFooter />
    </DataTable>
  );
};

export default function ExamplePage() {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <Container>
      <Row className="justify-content-center m-4 custom-row">
        <Col>
          <CoursesTable data={data.results} />
        </Col>
      </Row>
    </Container>
  );
}

CourseCard.propTypes = {
  className: PropTypes.string,
  original: PropTypes.objectOf(PropTypes.any),
};

CourseCard.defaultProps = {
  className: '',
  original: {},
};

CoursesTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape([])),
};

CoursesTable.defaultProps = {
  data: [],
};

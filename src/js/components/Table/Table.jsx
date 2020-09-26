<<<<<<< HEAD
<<<<<<< HEAD
import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';
import 'antd/dist/antd.css';
import {
  Table, Space, Input, Button,
<<<<<<< HEAD
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FetchReq, UrlConstructor } from '../../utils';

const MAX_ROWS = 5;
const START_PAGE = 1;

const TableComponent = ({
  columns, url, maxRows = MAX_ROWS, onClick, filter = {},
}) => {
  const searchInput = useRef(null);
  const searchState = useRef({
    text: '',
    column: '',
  });
  const [total, setTotal] = useState(maxRows);
  const [loading, setLoading] = useState(true);
  const [Columns, setColumns] = useState(columns);
  const [dataSource, setDataSource] = useState([]);
  const [pageNumber, setPageNumber] = useState(START_PAGE);
  const handleReset = useCallback((clearFilters) => {
    clearFilters();

    searchState.current = {
      ...searchState,
      text: '',
    };
  });
  const handleSearch = useCallback((selectedKeys, confirm, dataIndex) => {
    searchState.current = {
      text: selectedKeys[0],
      column: dataIndex,
    };
    confirm();
  });

  const getData = useCallback(async (page) => {
    const reqUrl = UrlConstructor(url, { _page: page, _limit: maxRows, ...filter });

    let data = await FetchReq(reqUrl);

    let { Total } = data;

    if (Total) {
      if (Total % maxRows) {
        Total = Math.ceil(Total / maxRows) * maxRows;
      }

      setTotal(Total);
    }

    if (Array.isArray(data)) {
      data = (Array.isArray(data) ? data : [data]).map((el) => ({
        key: el.id,
        ...el,
      }));
    }

    return data;
  }, [url]);
  const getColumnSearchProps = useCallback(
    ({ dataIndex, sorter }) => {
      let sorterMethod = false;

      if (typeof sorter === 'function') {
        sorterMethod = sorter;
      } else if (typeof sorter === 'boolean' && sorter) {
        sorterMethod = (a, b) => (a[dataIndex] > b[dataIndex] ? 1 : -1);
      }

      return {
        filterDropdown: ({
          setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={(node) => {
                searchInput.current = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined/>}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => handleReset(clearFilters)} size="small"
                      style={{ width: 90 }}>
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => <SearchOutlined
          style={{ color: filtered ? '#1890ff' : undefined }}/>,
        onFilter: (value, record) => (record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : ''),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current.select(), 100);
          }
        },
        render: (handleText) => {
          const { current: { column, text } } = searchState;
          return (column === dataIndex
            ? (<Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[text]} // [this.state.searchText]
              autoEscape
              textToHighlight={handleText ? handleText.toString() : ''}
            />)
            : handleText);
        },
        sorter: sorterMethod,
      };
    },
    [searchState],
  );

  useEffect(() => {
    const columnsWithProps = Columns.map((column) => {
      const { searched } = column;
      if (searched) {
        return {
          ...column,
          ...getColumnSearchProps(column),
        };
      }
      return column;
    });
    setLoading(true);
    setColumns(columnsWithProps);
  }, []);
  useEffect(() => {
    const showData = async () => {
      setLoading(true);
      const data = await getData(pageNumber);
      setDataSource(data);
      setTimeout(setLoading.bind(false), 200);
    };
    showData();
  }, [pageNumber]);
  return (
    <>
      <Table
        dataSource={dataSource}
        columns={Columns}
        loading={loading}
        pagination={{
          total,
          current: pageNumber,
          pageSize: maxRows,
          onChange: setPageNumber,
        }}
        onRow={(record, rowIndex) => ({
          onClick: onClick.bind(null, record, rowIndex), // click row
          onDoubleClick: () => {}, // double click row
          onContextMenu: () => {}, // right button click row
          onMouseEnter: () => {}, // mouse enter row
          onMouseLeave: () => {}, // mouse leave row
        })
        }
      />
    </>
  );
};
TableComponent.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    dataIndex: PropTypes.string,
    searched: PropTypes.bool,
    textType: PropTypes.bool,
    sorter: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool,
    ]),
  })),
  url: PropTypes.string,
  maxRows: PropTypes.number,
  onClick: PropTypes.func,
};
TableComponent.defaultProps = {
  columns: [],
  url: '',
  maxRows: MAX_ROWS,
  onClick: () => {},
};

export default TableComponent;

=======
import React from 'react';
=======
import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
>>>>>>> feat: table component
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';
import 'antd/dist/antd.css';
import {
  Table, Space, Input, Button, Form, Switch,
=======
>>>>>>> feat: table - pagination, filter
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FetchReq, UrlConstructor, TextSorter } from '../../utils';

const MAX_ROWS = 5;
const START_PAGE = 1;

const TableComponent = ({
  columns, url, maxRows = MAX_ROWS, onClick, filter = {},
}) => {
  const searchInput = useRef(null);
  const searchState = useRef({
    text: '',
    column: '',
  });
  const [total, setTotal] = useState(maxRows);
  const [loading, setLoading] = useState(true);
  const [Columns, setColumns] = useState(columns);
  const [dataSource, setDataSource] = useState([]);
  const [pageNumber, setPageNumber] = useState(START_PAGE);
  const handleReset = useCallback((clearFilters) => {
    clearFilters();

    searchState.current = {
      ...searchState,
      text: '',
    };
  });
  const handleSearch = useCallback((selectedKeys, confirm, dataIndex) => {
    searchState.current = {
      text: selectedKeys[0],
      column: dataIndex,
    };
    confirm();
  });

  const getData = useCallback(async (page) => {
    const reqUrl = UrlConstructor(url, { _page: page, _limit: maxRows, ...filter });

    let data = await FetchReq(reqUrl);

    let { Total } = data;

    if (Total) {
      if (Total % maxRows) {
        Total = Math.ceil(Total / maxRows) * maxRows;
      }

      setTotal(Total);
    }

    if (Array.isArray(data)) {
      data = (Array.isArray(data) ? data : [data]).map((el) => ({
        key: el.id,
        ...el,
      }));
    }

    return data;
  }, [url]);
  const getColumnSearchProps = useCallback(
    ({ dataIndex, sorter }) => {
      let sorterMethod = false;

      if (typeof sorter === 'function') {
        sorterMethod = sorter;
      } else if (typeof sorter === 'boolean' && sorter) {
        sorterMethod = (a, b) => (a[dataIndex] > b[dataIndex] ? 1 : -1);
      }

      console.log(sorterMethod)

      return {
        filterDropdown: ({
          setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={(node) => {
                searchInput.current = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined/>}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => handleReset(clearFilters)} size="small"
                      style={{ width: 90 }}>
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => <SearchOutlined
          style={{ color: filtered ? '#1890ff' : undefined }}/>,
        onFilter: (value, record) => (record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : ''),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current.select(), 100);
          }
        },
        render: (handleText) => {
          const { current: { column, text } } = searchState;

          return (column === dataIndex
            ? (<Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[text]} // [this.state.searchText]
              autoEscape
              textToHighlight={handleText ? handleText.toString() : ''}
            />)
            : handleText);
        },
        sorter: sorterMethod,
      };
    },
    [searchState],
  );

  useEffect(() => {
    const columnsWithProps = Columns.map((column) => {
      const { searched } = column;

      if (searched) {
        return {
          ...column,
          ...getColumnSearchProps(column),
        };
      }
      return column;
    });

    setLoading(true);

    setColumns(columnsWithProps);
  }, []);

  useEffect(() => {
    const showData = async () => {
      setLoading(true);
      const data = await getData(pageNumber);

      setDataSource(data);
      setTimeout(setLoading.bind(false), 200);
    };

    showData();
  }, [pageNumber]);

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={Columns}
        loading={loading}
        pagination={{
          total,
          current: pageNumber,
          pageSize: maxRows,
          onChange: setPageNumber,
        }}
        onRow={(record, rowIndex) => ({
          onClick: onClick.bind(null, record, rowIndex), // click row
          onDoubleClick: () => {}, // double click row
          onContextMenu: () => {}, // right button click row
          onMouseEnter: () => {}, // mouse enter row
          onMouseLeave: () => {}, // mouse leave row
        })
        }
      />
    </>
  );
};

TableComponent.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    dataIndex: PropTypes.string,
    searched: PropTypes.bool,
    textType: PropTypes.bool,
    sorter: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool,
    ]),
  })),
  url: PropTypes.string,
  maxRows: PropTypes.number,
  onClick: PropTypes.func,
};

TableComponent.defaultProps = {
  columns: [],
  url: '',
  maxRows: MAX_ROWS,
  onClick: () => {},
};

<<<<<<< HEAD
export default Table;
>>>>>>> feat: loading
=======
export default TableComponent;
>>>>>>> feat: table component

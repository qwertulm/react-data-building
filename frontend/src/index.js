import React from 'react';
import ReactDOM from 'react-dom';

import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { ProductsLoader } from './products-loader.jsx';
const filterOperators= {
  'text': [
    { text: 'grid.filterEqOperator', operator: 'eq' },
    { text: 'grid.filterNotEqOperator', operator: 'neq' },
    { text: 'grid.filterStartsWithOperator', operator: 'startswith' },
    { text: 'grid.filterEndsWithOperator', operator: 'endswith' },
    { text: 'grid.filterIsNullOperator', operator: 'isnull' },
    { text: 'grid.filterIsNotNullOperator', operator: 'isnotnull' },
    { text: 'grid.filterIsEmptyOperator', operator: 'isempty' },
    { text: 'grid.filterIsNotEmptyOperator', operator: 'isnotempty' }
  ],
  'numeric': [
    { text: 'grid.filterEqOperator', operator: 'eq' },
    { text: 'grid.filterNotEqOperator', operator: 'neq' },
    { text: 'grid.filterGteOperator', operator: 'gte' },
    { text: 'grid.filterGtOperator', operator: 'gt' },
    { text: 'grid.filterLteOperator', operator: 'lte' },
    { text: 'grid.filterLtOperator', operator: 'lt' },
    { text: 'grid.filterIsNullOperator', operator: 'isnull' },
    { text: 'grid.filterIsNotNullOperator', operator: 'isnotnull' }
  ],
  'date': [
    { text: 'grid.filterEqOperator', operator: 'eq' },
    { text: 'grid.filterNotEqOperator', operator: 'neq' },
    { text: 'grid.filterAfterOrEqualOperator', operator: 'gte' },
    { text: 'grid.filterAfterOperator', operator: 'gt' },
    { text: 'grid.filterBeforeOperator', operator: 'lt' },
    { text: 'grid.filterBeforeOrEqualOperator', operator: 'lte' },
    { text: 'grid.filterIsNullOperator', operator: 'isnull' },
    { text: 'grid.filterIsNotNullOperator', operator: 'isnotnull' }
  ],
  'boolean': [
    { text: 'grid.filterEqOperator', operator: 'eq' }
  ]
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: { data: [], total: 0 },
      dataState: { take: 10, skip: 0 }
    };
  }

  dataStateChange = (e) => {
    this.setState({
      ...this.state,
      dataState: e.data
    });
  }

  dataRecieved = (products) => {
    this.setState({
      ...this.state,
      products: products
    });
  }

  render() {
    return (
        <div>
          <Grid
              filterable={true}
              sortable={true}
              pageable={true}
              {...this.state.dataState}
              {...this.state.products}
              onDataStateChange={this.dataStateChange}
              filterOperators={filterOperators}
          >
            <Column field="Id" filter="numeric" title="Id" />
            <Column field="Name"  title="Name" />
            <Column field="Sku" title="Sku" />
            <Column field="Year" filter="numeric" title="In stock" />
          </Grid>

          <ProductsLoader
              dataState={this.state.dataState}
              onDataRecieved={this.dataRecieved}
          />
        </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('my-app'));


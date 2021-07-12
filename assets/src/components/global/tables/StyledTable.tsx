import { lighten, transparentize } from 'polished'
import * as React from 'react'
import ReactTable, { Column, TableProps } from 'react-table'

import 'styles/react-table.css'

import { c, m, s } from 'styles'
import styled, { css } from 'styled-components'

export type Props<T> = {
  data: T[]
  columns: Column<T>[]
  tableProps?: Partial<TableProps>
  defaultPageSize?: number
  color?: string
  headerColor?: string
  hoverBg?: string
  className?: string
  style?: any
  NoDataComponent?: any
  showPageSizeOptions?: boolean
  onClickRow?: (original: T, column: Column<T>) => void
  getTdProps?: any
  children?: any
}

class StyledTable<T> extends React.Component<Props<T>> {
  static defaultProps = {
    data: [],
    columns: [],
    defaultPageSize: 100,
    showPageSizeOptions: false,
    tableProps: {
      showPagination: false,
      minRows: 0,
      resizable: true
    },
    className: '',
    color: c.black,
    hoverBg: c.black05
  }

  render() {
    const { tableProps, className, style, onClickRow, getTdProps, ...rest } = this.props

    return (
      <Table
        {...tableProps}
        className={`-highlight ${className}`}
        style={style}
        getTdProps={
          getTdProps ||
          ((state, rowInfo, column, instance) => ({
            style: {
              cursor: onClickRow ? 'pointer' : 'normal'
            },
            onClick: (e, handleOriginal) => {
              if (rowInfo && rowInfo.original && onClickRow) onClickRow(rowInfo.original, column)

              // IMPORTANT! React-Table uses onClick internally to trigger
              // events like expanding SubComponents and pivots.
              // By default a custom 'onClick' handler will override this functionality.
              // If you want to fire the original onClick handler, call the
              // 'handleOriginal' function.
              if (handleOriginal) {
                handleOriginal()
              }
            }
          }))
        }
        {...rest}
      />
    )
  }
}

export default StyledTable

const filtersStyles = css`
  &&& .-filters {
    padding: 8px 0;
    .rt-th {
      opacity: 1;
    }
  }
`

// tslint:disable-next-line:no-bitwise
const Table = styled(ReactTable)<Props<any>>`
  ${s.boxProps as any} ${filtersStyles}
  width:100%;
  color: ${p => p.color};

  .rt-thead {
    color: ${p => p.headerColor};
    .rt-tr {
      background: transparent;
    }
  }

  .rt-tbody .rt-tr {
    transition: background 250ms;
    border-radius: 4px;
    &:hover {
      background: ${p => p.hoverBg} !important;
      transition: background 50ms;
      & .action-cell {
        opacity: 0.9;
      }
    }
  }

  .rt-th {
    padding-bottom: 4px;
    & > div {
      flex: 1 1 0%;
    }
    &:focus {
      outline: none;
    }
  }

  .rt-td {
    padding: 10px;
    ${s.aic} white-space:normal;
    word-break: break-all;
  }

  .rt-td,
  .rt-th {
    padding-right: 8px;
    &:first-child {
      padding-left: 12px;
    }
    &:last-child {
      padding-right: 12px;
    }
  }

  &.showOverflow {
    .rt-table {
      overflow-y: unset;
    }
    .rt-tbody {
      overflow-y: unset;
    }
    .rt-td {
      overflow: visible !important;
    }
  }

  &.overflow-visible {
    overflow: inherit !important;
    .rt-table {
      overflow: inherit !important;
    }
    .rt-tbody {
      overflow: inherit !important;
    }
  }

  .no-padding {
    padding: 0 !important;
  }
  .overflow {
    overflow: inherit !important;
  }
  .left {
    justify-content: flex-start !important;
  }
  .right {
    justify-content: flex-end !important;
  }
`

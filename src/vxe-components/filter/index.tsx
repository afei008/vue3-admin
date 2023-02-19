/** @format */

/* eslint-disable no-param-reassign */
import { VXETable } from 'vxe-table';
import FilterInput from './FilterInput.vue';
import FilterContent from './FilterContent.vue';
import FilterCondition from './FilterCondition.vue';
import FilterExtend from './FilterExtend.vue';

// 创建一个简单的输入框筛选
VXETable.renderer.add('FilterInput', {
  // 筛选模板
  renderFilter(renderOpts, params) {
    return [<FilterInput params={params}></FilterInput>];
  },
  // 重置数据方法
  filterResetMethod(params) {
    const { options } = params;
    options.forEach((option) => {
      option.data = '';
    });
  },
  // 重置筛选复原方法（当未点击确认时，该选项将被恢复为默认值）
  filterRecoverMethod({ option }) {
    option.data = '';
  },
  // 筛选方法
  filterMethod(params) {
    const { option, row, column } = params;
    const { name } = option.data;
    const cellValue = row[column.property];
    if (cellValue) {
      return cellValue.indexOf(name) > -1;
    }
    return false;
  },
});

// 创建一个条件的渲染器
VXETable.renderer.add('FilterCondition', {
  // 不显示底部按钮，使用自定义的按钮
  showFilterFooter: false,
  // 筛选模板
  renderFilter(renderOpts, params) {
    return [<FilterCondition params={params}></FilterCondition>];
  },
  // 重置数据方法
  filterResetMethod(params) {
    const { options } = params;
    options.forEach((option) => {
      option.data = { type: 'has', name: '' };
    });
  },
  // 筛选数据方法
  filterMethod(params) {
    const { option, row, column } = params;
    const cellValue = row[column.property];
    const { name } = option.data;
    if (cellValue) {
      return cellValue.indexOf(name) > -1;
    }
    return false;
  },
});

// 创建一个支持列内容的筛选
VXETable.renderer.add('FilterContent', {
  // 不显示底部按钮，使用自定义的按钮
  showFilterFooter: false,
  // 筛选模板
  renderFilter(renderOpts, params) {
    return [<FilterContent params={params}></FilterContent>];
  },
  // 重置数据方法
  filterResetMethod(params) {
    const { options } = params;
    options.forEach((option) => {
      option.data = { values: [], searchValue: '' };
    });
  },
  // 筛选数据方法
  filterMethod(params) {
    const { option, row, column } = params;
    const { values } = option.data;
    const cellValue = String(row[column.property]);
    if (values.length === 0) {
      return true;
    }
    return values.includes(cellValue);
  },
});

// 创建一个复杂的筛选器
// 有 bug，未调试
VXETable.renderer.add('FilterExtend', {
  // 不显示底部按钮，使用自定义的按钮
  showFilterFooter: false,
  // 筛选模板
  renderFilter(renderOpts, params) {
    return [<FilterExtend params={params}></FilterExtend>];
  },
  // 重置数据方法
  filterResetMethod(params) {
    const { options } = params;
    options.forEach((option) => {
      option.data = {
        vals: [],
        sVal: '',
        fMenu: '',
        f1Type: '',
        f1Val: '',
        fMode: 'and',
        f2Type: '',
        f2Val: '',
      };
    });
  },
  // 筛选数据方法
  filterMethod(params) {
    const { option, row, column } = params;
    const cellValue = row[column.property];
    const { vals, f1Type, f1Val } = option.data;
    if (cellValue) {
      if (f1Type) {
        return cellValue.indexOf(f1Val) > -1;
      }
      if (vals.length) {
        // 通过指定值筛选
        return vals.includes(cellValue);
      }
    }
    return false;
  },
});

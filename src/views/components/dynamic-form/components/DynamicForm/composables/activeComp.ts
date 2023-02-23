/** @format */

import { reactive } from 'vue';
import type DynamicTypes from '../interface';

interface Prop {
  prop: DynamicTypes;
  setProp: (v: any) => void;
}

const activeComp = reactive(<Prop>{
  prop: {
    type: '',
    name: '',
    label: '',
    value: '',
    options: [],
    attrs: {
      placeholder: '',
    },
  },
  setProp(v: any) {
    this.prop = v;
  },
});

export default activeComp;

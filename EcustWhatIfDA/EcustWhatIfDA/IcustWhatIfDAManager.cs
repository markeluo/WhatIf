using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace EcustWhatIfDA
{
    ///蒸馏塔计算处理
   public  interface IcustWhatIfDAManager
    {
        /// <summary>
        /// 表格数据格式计算
        /// </summary>
        /// <param name="inputData"></param>
        /// <returns></returns>
         DataTable WhatIfDA(DataTable inputData);
        /// <summary>
        /// 输入、输出对象格式计算
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
         EWMOUT EWManager(EWMITEM items);
    }
}

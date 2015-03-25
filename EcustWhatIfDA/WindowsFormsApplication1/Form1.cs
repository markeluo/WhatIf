using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace WindowsFormsApplication1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("TagName");
            dt.Columns.Add("value");
            string[] temp = { "HYFIC2409PV", "HYFIC2414PV", "HYFIC2503PV", };


            double[] a = { 0, 0, 0 };
            a[0] = Convert.ToDouble(textBox1.Text);
            a[1] = Convert.ToDouble(textBox2.Text);
            a[2] = Convert.ToDouble(textBox3.Text);

            for (int i = 0; i < 3; i++)
            {
                DataRow dr = dt.NewRow();
                dr["value"] = a[i].ToString();
                dr["TagName"] = temp[i];
                dt.Rows.Add(dr);
            }


            EcustWhatIfDA.IcustWhatIfDAManager aa = null;
            if (comboBox1.SelectedIndex == 0)
            {
                aa =new EcustWhatIfDA.EcustWhatIfDA452();
            }
            else
            {
                aa = new EcustWhatIfDA.EcustWhatIfDA402();
            }
            DataTable ds = aa.WhatIfDA(dt);

            dataGridView1.DataSource = ds;
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            comboBox1.SelectedIndex = 0;
        }
    }
}

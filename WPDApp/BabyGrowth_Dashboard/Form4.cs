using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace BabyGrowth_Dashboard
{
    public partial class Form4 : Form
    {
        public Form4()
        {
            InitializeComponent();
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void loginBtn_Click(object sender, EventArgs e)
        {
            string username = us.Text.Trim();
            string password = ps.Text.Trim();

            
            if (username == "admin" && password == "admin")
            {
                MessageBox.Show("Login Successful");
                this.Close();
            }
            else
            {
                MessageBox.Show("Invalid Username or Password");

            }
        }

    }
}

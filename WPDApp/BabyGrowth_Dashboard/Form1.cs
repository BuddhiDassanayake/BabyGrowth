using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft.Json;

namespace BabyGrowth_Dashboard
{
    public partial class Form1 : Form
    {
        private static readonly string ApiBaseUrl = "http://localhost:5000/api";

        public Form1()
        {
            InitializeComponent();//component initailized
            Form4 form4 = new Form4();
            form4.ShowDialog();
        }

        private async void button1_Click(object sender, EventArgs e)
        {
            await LoadUsersAsync();
        }

        private async Task LoadUsersAsync()
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    var response = await client.GetStringAsync($"{ApiBaseUrl}/users");
                    var users = JsonConvert.DeserializeObject<List<User>>(response);
                    dgUsers.DataSource = users;
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Error: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }

        private async void btnDelete_Click(object sender, EventArgs e)
        {

            if (dgUsers.SelectedRows.Count == 0)
            {
                MessageBox.Show("Please select a user to delete.", "Warning", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            int userId = Convert.ToInt32(dgUsers.SelectedRows[0].Cells["id"].Value);

            var confirm = MessageBox.Show("Are you sure you want to delete this user?", "Confirm Delete", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
            if (confirm == DialogResult.No) return;

            using (HttpClient client = new HttpClient())
            {
                var response = await client.DeleteAsync($"{ApiBaseUrl}/delete-user/{userId}");
                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("User deleted successfully!", "Success", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    await LoadUsersAsync();
                }
                else
                {
                    MessageBox.Show("Failed to delete user.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }

        private void button1_Click_1(object sender, EventArgs e)
        {
            // Create an instance of Form2
            Form2 form2 = new Form2();

            // Show Form2 as a dialog box (blocks interaction with Form1 until Form2 is closed)
            form2.ShowDialog();
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {

        }

        private void button2_Click(object sender, EventArgs e)
        {

        }

        private void button2_Click_1(object sender, EventArgs e)
        {

        }

      
    }

    public class User
    {
        public int id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}

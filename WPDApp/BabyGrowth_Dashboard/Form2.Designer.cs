namespace BabyGrowth_Dashboard
{
    partial class Form2
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form2));
            txtName = new TextBox();
            label1 = new Label();
            label2 = new Label();
            txtEmail = new TextBox();
            label3 = new Label();
            txtPassword = new TextBox();
            btnSave = new Button();
            label4 = new Label();
            pictureBox1 = new PictureBox();
            ((System.ComponentModel.ISupportInitialize)pictureBox1).BeginInit();
            SuspendLayout();
            // 
            // txtName
            // 
            txtName.Font = new Font("Segoe UI", 12F);
            txtName.Location = new Point(205, 180);
            txtName.Name = "txtName";
            txtName.Size = new Size(245, 34);
            txtName.TabIndex = 0;
            txtName.TextChanged += txtName_TextChanged;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.BackColor = Color.Transparent;
            label1.Font = new Font("Segoe UI", 12F);
            label1.Location = new Point(103, 187);
            label1.Name = "label1";
            label1.Size = new Size(64, 28);
            label1.TabIndex = 1;
            label1.Text = "Name";
            label1.Click += btnSave_Click;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.BackColor = Color.Transparent;
            label2.Font = new Font("Segoe UI", 12F);
            label2.Location = new Point(103, 231);
            label2.Name = "label2";
            label2.Size = new Size(59, 28);
            label2.TabIndex = 3;
            label2.Text = "Email";
            label2.Click += btnSave_Click;
            // 
            // txtEmail
            // 
            txtEmail.Font = new Font("Segoe UI", 12F);
            txtEmail.Location = new Point(205, 231);
            txtEmail.Name = "txtEmail";
            txtEmail.Size = new Size(245, 34);
            txtEmail.TabIndex = 2;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.BackColor = Color.Transparent;
            label3.Font = new Font("Segoe UI", 12F);
            label3.Location = new Point(103, 279);
            label3.Name = "label3";
            label3.Size = new Size(93, 28);
            label3.TabIndex = 5;
            label3.Text = "Password";
            label3.Click += btnSave_Click;
            // 
            // txtPassword
            // 
            txtPassword.Font = new Font("Segoe UI", 12F);
            txtPassword.Location = new Point(205, 279);
            txtPassword.Name = "txtPassword";
            txtPassword.Size = new Size(245, 34);
            txtPassword.TabIndex = 4;
            // 
            // btnSave
            // 
            btnSave.BackColor = Color.FromArgb(255, 192, 192);
            btnSave.Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            btnSave.Location = new Point(328, 344);
            btnSave.Name = "btnSave";
            btnSave.Size = new Size(122, 41);
            btnSave.TabIndex = 6;
            btnSave.Text = "Save";
            btnSave.UseVisualStyleBackColor = false;
            btnSave.Click += btnSave_Click;
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.BackColor = Color.Transparent;
            label4.Font = new Font("Segoe UI", 16.2F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label4.Location = new Point(150, 120);
            label4.Name = "label4";
            label4.Size = new Size(267, 38);
            label4.TabIndex = 7;
            label4.Text = "Add User Manually";
            label4.Click += btnSave_Click;
            // 
            // pictureBox1
            // 
            pictureBox1.BackColor = Color.Transparent;
            pictureBox1.BackgroundImage = (Image)resources.GetObject("pictureBox1.BackgroundImage");
            pictureBox1.BackgroundImageLayout = ImageLayout.Stretch;
            pictureBox1.Location = new Point(246, 429);
            pictureBox1.Name = "pictureBox1";
            pictureBox1.Size = new Size(93, 46);
            pictureBox1.TabIndex = 8;
            pictureBox1.TabStop = false;
            // 
            // Form2
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = SystemColors.Control;
            BackgroundImage = (Image)resources.GetObject("$this.BackgroundImage");
            BackgroundImageLayout = ImageLayout.Stretch;
            ClientSize = new Size(607, 634);
            Controls.Add(pictureBox1);
            Controls.Add(label4);
            Controls.Add(btnSave);
            Controls.Add(label3);
            Controls.Add(txtPassword);
            Controls.Add(label2);
            Controls.Add(txtEmail);
            Controls.Add(label1);
            Controls.Add(txtName);
            DoubleBuffered = true;
            Name = "Form2";
            Text = "Add User";
            Load += Form2_Load;
            ((System.ComponentModel.ISupportInitialize)pictureBox1).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private TextBox txtName;
        private Label label1;
        private Label label2;
        private TextBox txtEmail;
        private Label label3;
        private TextBox txtPassword;
        private Button btnSave;
        private Label label4;
        private PictureBox pictureBox1;
    }
}
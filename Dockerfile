# 1. Use the official lightweight Python base image
FROM python:3.13-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy only the dependency file first to leverage Docker caching layers
COPY requirements.txt .

# 4. Install the required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of your application code into the container
COPY . .

# 6. Expose the port your Flask application runs on
EXPOSE 5000

# 7. Define the runtime command to launch your web application
CMD ["python", "app.py"]
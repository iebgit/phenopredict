# Use the official Python image from DockerHub
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Add the necessary dependencies for FastAPI and file upload handling
RUN pip install fastapi uvicorn python-multipart

# Expose port 8000 for the API
EXPOSE 8001

# Run the application using uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001", "--reload"]
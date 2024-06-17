
# Use an official Node runtime as a parent image
FROM python:3.9.1-buster

# Use an environment variable for our working direectory
ENV APP_PATH=/opt/neuralume/app
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create the working directory
RUN mkdir -p ${APP_PATH}

# Set the working directory
WORKDIR ${APP_PATH}}

# Copy package.json to the working directory
COPY ./api/requirements.txt .

# Install any needed packages specified in package.json
RUN pip install -r requirements.txt

# Copying the rest of the code to the working directory
COPY ./api .

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run gunicorn when the container launches
CMD ["gunicorn", "api.wsgi:application", "--bind", "0.0.0.0:8000"]
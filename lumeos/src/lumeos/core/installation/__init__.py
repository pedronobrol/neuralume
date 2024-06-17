import shutil
import os


def create_service():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    lume_service_path = os.path.join(dir_path, 'lume.service')
    shutil.copy(lume_service_path, '/etc/systemd/system')

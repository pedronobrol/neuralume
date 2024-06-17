from setuptools import setup, find_packages
from setuptools.command.install import install
from subprocess import check_call
from src.lumeos import (
    __email__,
    __author__,
    __uri__,
    __description__,
    __name__,
    __version__
)
from src.lumeos.core.installation import create_service


class InstallCommand(install):
    """Post-installation for installation mode."""
    def run(self):
        install.run(self)
        create_service()
        check_call("systemctl enable lume.service".split())


setup(
    name=__name__,
    version=__version__,
    description=__description__,
    url=__uri__,
    author=__author__,
    author_email=__email__,
    packages=find_packages(where='src'),
    install_requires=[
        # These are the requisites for an official installation.
        # requirements.txt indicates requirements for testing and development.
    ],
    scripts=['bin/lume', ],
    package_dir={'': 'src'},
    cmdclass={
        'install': InstallCommand,
    },
    zip_safe=False
)
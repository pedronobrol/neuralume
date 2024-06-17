import os
import sys
import traceback
from typing import Optional, Mapping
from lumeos.core.exceptions import EvaluationException

import clibot
from lumeos.core.app import App


class CommandLineInterpreter(clibot.BaseInterpreter):
    def map(self, /) -> Optional[Mapping]:
        return {
            'start': StartCommand,
            'ping': PingCommand
        }


class StartCommand(clibot.AbstractBaseCommand):

    @staticmethod
    def action(*args, **kwargs):
        app = App()
        app.run()

    def configure(self, /) -> None:
        pass


def execute_from_command_line(argv):
    if os.environ.get('LUMEOS_ENVIRON') is None:
        os.environ['LUMEOS_ENVIRON'] = '/etc/neuralume'

    interpreter = CommandLineInterpreter()
    try:
        interpreter.run(argv[1:])

    except BaseException as exc:
        traceback.print_exc()
        sys.exit(1)


class PingCommand(clibot.AbstractBaseCommand):
    @staticmethod
    def action(*args, **kwargs):
        return 'PONG'

    def configure(self, /) -> None:
        pass


def execute_from_socket(arg):
    args = arg.split()
    interpreter = CommandLineInterpreter()
    try:
        return interpreter.run(args)
    except BaseException as exc:
        raise EvaluationException from exc

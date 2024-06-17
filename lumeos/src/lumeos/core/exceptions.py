class LumeOSError(Exception):
    pass


class MisconfiguredEnvironment(LumeOSError):
    pass


class UnavailableEnvironment(MisconfiguredEnvironment):
    def __init__(self, msg=None):
        msg = msg or f'lumeOS environment path does not exist and it cannot ' \
                     f'be created.'
        super().__init__(msg)


class MisconfiguredSettings(MisconfiguredEnvironment):
    def __init__(self, msg=None):
        msg = f'lumeOS settings are improperly configured. ({self.__cause__} ' \
              f'{msg})'
        super().__init__(msg)


class NoInternetAccess(LumeOSError):
    pass


class EvaluationError(LumeOSError):
    pass

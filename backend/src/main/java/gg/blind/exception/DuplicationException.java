package gg.blind.exception;

public class DuplicationException extends CustomRuntimeException {
	public DuplicationException(ErrorCode errorCode) {
		super(errorCode);
	}
}

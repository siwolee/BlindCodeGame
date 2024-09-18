package gg.blind.exception;

public class BusinessException extends CustomRuntimeException {
	public BusinessException(ErrorCode errorCode) {
		super(errorCode);
	}
}
